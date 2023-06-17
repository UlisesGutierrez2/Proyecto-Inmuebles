const request = require("supertest");
const app = require("../index");
const inmuebleAlta = {
    Numero_Catastral: 2,
    Ubicacion: "Avenida Juarez Ciudad B",
    Zona: "Comercial",
    Tipo: "Local comercial",
    Numero_Contribuyente: 2,
    FechaRegCatastro: "2023-04-10",
};
const inmuebleModificacion = {
    Numero_Catastral: 2,
    Ubicacion: "Avenida Juarez Ciudad B",
    Zona: "Comercial",
    Tipo: "Local comercial",
    Numero_Contribuyente: 2,
    FechaRegCatastro: "2023-04-10",
};


// test route/inmuebles GET
describe("GET /api/inmuebles", () => {
  it("Deberia devolver todos los inmuebles", async () => {
    const res = await request(app).get("/api/inmuebles");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
     expect.objectContaining({
      Items: 
      expect.arrayContaining([
        expect.objectContaining({
          Numero_Catastral: expect.any(Number),
          Ubicacion: expect.any(String),
          Zona: expect.any(String),
          Tipo: expect.any(String),
          Numero_Contribuyente: expect.any(Number),
          FechaRegCatastro: expect.any(String),
          
        })
      ]),
      RegistrosTotal:  expect.any(Number) 
     })
    );
  });
});

// test route/inmuebles/:id GET
describe("GET /api/inmuebles/:id", () => {
  it("Deberia devolver el articulo con el id 2", async () => {
    const res = await request(app).get("/api/inmuebles/2");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Numero_Catastral: expect.any(Number),
        Ubicacion: expect.any(String),
        Zona: expect.any(String),
        Tipo: expect.any(String),
        Numero_Contribuyente: expect.any(Number),
        FechaRegCatastro: expect.any(String),
      })
    );
  });
});

// test route/inmuebles/:id PUT
describe("PUT /api/inmuebles/:id", () => {
  it("Deberia devolver el articulo con el id 2 modificado", async () => {
    const res = await request(app).put("/api/inmuebles/2").send(inmuebleModificacion);
    expect(res.statusCode).toEqual(200);
  });
});

// test route/inmuebles/:id DELETE
describe("DELETE /api/inmuebles/:id", () => {
  it("Deberia devolver el articulo con el id 2 borrado", async () => {
    const res = await request(app).delete("/api/inmuebles/2");
    expect(res.statusCode).toEqual(200);
    
    // baja logica, no se borra realmente
    // expect(res.body).toEqual(
    //   expect.objectContaining({
    //     Numero_Catastral: expect.any(Number),
    //     Ubicacion: expect.any(String),
    //     Precio: expect.any(Number),
    //   })
    // );

  });
});

// test route/inmuebles POST
describe("POST /api/inmuebles", () => {
  it("Deberia devolver el articulo que acabo de crear", async () => {
    const res = await request(app).post("/api/inmuebles").send(inmuebleAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Numero_Catastral: expect.any(Number),
        Ubicacion: expect.any(String),
        Zona: expect.any(String),
        Tipo: expect.any(String),
        Numero_Contribuyente: expect.any(Number),
        FechaRegCatastro: expect.any(String),
      })
    );
  });
});