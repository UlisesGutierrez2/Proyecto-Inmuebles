// configurar ORM sequelize
const { Sequelize, DataTypes } = require("sequelize");
//const sequelize = new Sequelize("sqlite:" + process.env.base );
const sequelize = new Sequelize("sqlite:" + "./.data/TPI.db");

// definicion del modelo de datos
const localidades = sequelize.define(
  "localidades",
  {
    CodigoPostal: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre_Localidad: {
      // todo evitar que string autocomplete con espacios en blanco, deberia ser varchar sin espacios
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nombre es requerido",
        },
        len: {
          args: [5, 30],
          msg: "Nombre debe ser tipo carateres, entre 5 y 30 de longitud",
        },
      },
    },
    FechaFundacion: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "FechaDeFundacion es requerido",
        }
      }
    },
  },
  {
    // pasar a mayusculas
    hooks: {
      beforeValidate: function (localidades, options) {
        if (typeof localidades.Nombre === "string") {
          localidades.Nombre = localidades.Nombre.toUpperCase().trim();
        }
      },
    },

    timestamps: false,
  }
);

const contribuyentes = sequelize.define(
  "contribuyentes",
  {
    Nro_Contribuyente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nombre es requerido",
        },
        len: {
          args: [5, 60],
          msg: "Nombre debe ser tipo carateres, entre 5 y 60 de longitud",
        },
      },
    },

    Domicilio: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Domicilio es requerido",
        },
        len: {
          args: [3, 60],
          msg: "Domicilio debe ser tipo carateres, entre 5 y 60 de longitud",
        },
      },
    },

    CodigoPostal: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "CodigoPostal es requerido",
        }
      }
    },

    Barrio: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Barrio es requerido",
        },
        len: {
          args: [3, 60],
          msg: "Barrio debe ser tipo carateres, entre 5 y 60 de longitud",
        },
      },
    },

    FechaDeAlta: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "FechaDeAlta es requerido",
        }
      }
    },
  },
  {
    // pasar a mayusculas
    hooks: {
      beforeValidate: function (contribuyentes, options) {
        if (typeof contribuyentes.Nombre === "string") {
          contribuyentes.Nombre = contribuyentes.Nombre.toUpperCase().trim();
        }
      },
    },

    timestamps: false,
  }
);

const inmuebles = sequelize.define(
  "inmuebles",
  {
    Numero_Catastral: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    
    Ubicacion: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Ubicacion es requerido",
        },
        len: {
          args: [5, 60],
          msg: "Ubicacion debe ser tipo carateres, entre 5 y 60 de longitud",
        },
      },
    },

    Zona: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Zona es requerido",
        },
        len: {
          args: [3, 60],
          msg: "Zona debe ser tipo carateres, entre 5 y 60 de longitud",
        },
      },
    },

    Tipo: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "TIpo es requerido",
        },
        len: {
          args: [3, 60],
          msg: "Tipo debe ser tipo carateres, entre 5 y 60 de longitud",
        },
      },
    },

    Numero_Contribuyente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Numero_Contribuyente es requerido",
        }
      }
    },

    FechaRegCatastro: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "FechaRegCatastro es requerido",
        }
      }
    },
  },
  {
    // pasar a mayusculas
    hooks: {
      beforeValidate: function (inmuebles, options) {
        if (typeof inmuebles.Ubicacion === "string") {
          inmuebles.Ubicacion = inmuebles.Ubicacion.toUpperCase().trim();
        }
      },
    },

    timestamps: false,
  }


);

const vencimientos = sequelize.define(
  "vencimientos",
  {
    Nro_Cuota: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Año: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "FechaDeAlta es requerido",
        },
      },
    },
    Fecha_1er_vencimiento: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "FechaDeAlta es requerido",
        },
      },
    },
    Fecha_2do_vencimiento: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "FechaDeAlta es requerido",
        },
      },
    },
    Descripcion: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Descripcion es requerido",
        },
        len: {
          args: [3, 60],
          msg: "Descripcion debe ser tipo carateres, entre 5 y 60 de longitud",
        },
      },
    },
  },
  {
    // pasar a mayusculas
    hooks: {
      beforeValidate: function (vencimientos, options) {
        if (typeof vencimientos.Nombre === "string") {
          vencimientos.Nombre = vencimientos.Nombre.toUpperCase().trim();
        }
      },
    },

    timestamps: false,
  }
);

module.exports = {
  sequelize,
  localidades,
  contribuyentes,
  inmuebles,
  vencimientos
};