const request = require("supertest");
const app = require("../index");

const localidadAlta = {
  CodigoPostal: 3,
  Nombre_Localidad: (( ) => (Math.random() + 1).toString(36).substring(2))(), // Genera un nombre aleatorio
  FechaFundacion: (( ) => (Math.random() + 1).toString(36).substring(2))(),
};
const localidadModificacion = {
  CodigoPostal  : 3,
  Nombre_Localidad: (( ) => (Math.random() + 1).toString(36).substring(2))(), // Genera un nombre aleatorio
  FechaFundacion: (( ) => (Math.random() + 1).toString(36).substring(2))(),
};

const inmuebleAlta = {
  Numero_Catastral: 3,
  Ubicacion: "Avenida Juarez Ciudad B",
  Zona: "Comercial",
  Tipo: "Local comercial",
  Numero_Contribuyente: 3,
  FechaRegCatastro: "2023-04-10",
};

const contribuyenteAlta = {
  Nro_Contribuyente: 3,
  Nombre: (( ) => (Math.random() + 1).toString(36).substring(2))(), // Genera un nombre aleatorio
  Domicilio: (( ) => (Math.random() + 1).toString(36).substring(2))(), // Genera un domicilio aleatorio
  Barrio: (( ) => (Math.random() + 1).toString(36).substring(2))(), // Genera un barrio aleatorio
  CodigoPostal: 3, 
  FechaDeAlta: (( ) => (Math.random() + 1).toString(36).substring(2))(),
};


// test route/localidades GET
describe("GET /api/localidades", () => {
  it("Deberia devolver todas las localidades", async () => {
    const res = await request(app).get("/api/localidades");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
     expect.objectContaining({
      Items: 
      expect.arrayContaining([
        expect.objectContaining({
          CodigoPostal: expect.any(Number),
          Nombre_Localidad: expect.any(String),
          FechaFundacion: expect.any(String),
        })
      ]),
      RegistrosTotal:  expect.any(Number) 
     })
    );
  });
});

// test route/localidades/:id GET
describe("GET /api/localidades/:id", () => {
  it("Deberia devolver la localidad con el CodigoPostal 3", async () => {
    const res = await request(app).get("/api/localidades/3");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        CodigoPostal: expect.any(Number),
        Nombre_Localidad: expect.any(String),
        FechaFundacion: expect.any(String),
      })
    );
  });
});

// test route/contribuyentes/:id PUT
describe("PUT /api/localidades/:id", () => {
  it("Deberia devolver el CodigoPostal con el id 3 modificado", async () => {
    const res = await request(app).put("/api/localidades/3").send(localidadModificacion);
    expect(res.statusCode).toEqual(200);
  });
});


// test route/contribuyentes/:id DELETE
describe("DELETE /api/localidades/:id", () => {
  it("Deberia devolver la localidad con el id 3 borrado", async () => {
    const a = await request(app).delete("/api/inmuebles/3");
    const b = await request(app).delete("/api/contribuyentes/3");
    const res = await request(app).delete("/api/localidades/3");
    expect(res.statusCode).toEqual(200);
    
    // baja logica, no se borra realmente
    // expect(res.body).toEqual(
    //   expect.objectContaining({
    //     Nro_Contribuyente: expect.any(Number),
    //     Nombre: expect.any(String),
    //     CodigoPostal: expect.any(Number),
    //   })
    // );

  });
});

// test route/contribuyentes POST
describe("POST /api/localidades", () => {
  it("Deberia devolver la localidad que acabo de crear", async () => {
    const res = await request(app).post("/api/localidades").send(localidadAlta);
    const c = await request(app).post("/api/contribuyentes").send(contribuyenteAlta);
    const d = await request(app).post("/api/inmuebles").send(inmuebleAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        CodigoPostal: expect.any(Number),
        Nombre_Localidad: expect.any(String),
        FechaFundacion: expect.any(String),
      })
    );
  });
});

