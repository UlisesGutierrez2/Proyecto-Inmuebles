const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../seguridad/auth");

const users = [
  {
    usuario: "admin",
    clave: "123",
    rol: "admin",
  },
  {
    usuario: "juan",
    clave: "123",
    rol: "member",
  },
];
let refreshTokens = [];

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, auth.accessTokenSecret, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "El token no es válido" });
      }

      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ message: "Acceso denegado" });
  }
};

router.use(authenticateJWT);

router.post("/api/login", (req, res) => {
  const { usuario, clave } = req.body;

  const user = users.find((u) => {
    return u.usuario === usuario && u.clave === clave;
  });

  if (user) {
    const accessToken = jwt.sign(
      { usuario: user.usuario, rol: user.rol },
      auth.accessTokenSecret,
      { expiresIn: "20m" }
    );

    const refreshToken = jwt.sign(
      { usuario: user.usuario, rol: user.rol },
      auth.refreshTokenSecret
    );

    refreshTokens.push(refreshToken);

    res.json({
      accessToken,
      refreshToken,
      message: "¡Bienvenido " + user.usuario + "!",
    });
  } else {
    res.json({ message: "Usuario o clave incorrecto" });
  }
});

router.post("/api/logout", (req, res) => {
  let message = "¡Logout inválido!";
  const { token } = req.body;

  if (refreshTokens.includes(token)) {
    message = "¡Usuario deslogueado correctamente!";
  }

  refreshTokens = refreshTokens.filter((t) => t !== token);

  res.json({ message });
});

router.post("/api/token", (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.sendStatus(401);
  }

  if (!refreshTokens.includes(refreshToken)) {
    return res.sendStatus(403);
  }

  jwt.verify(refreshToken, auth.refreshTokenSecret, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    const accessToken = jwt.sign(
      { usuario: user.usuario, rol: user.rol },
      auth.accessTokenSecret,
      { expiresIn: "20m" }
    );

    res.json({
      accessToken,
    });
  });
});

module.exports = router;