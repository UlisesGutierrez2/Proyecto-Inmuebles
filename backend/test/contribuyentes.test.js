const request = require("supertest");
const app = require("../index");
const contribuyenteAlta = {
  Nro_Contribuyente: 1,
  Nombre: (( ) => (Math.random() + 1).toString(36).substring(2))(), // Genera un nombre aleatorio
  Domicilio: (( ) => (Math.random() + 1).toString(36).substring(2))(), // Genera un domicilio aleatorio
  Barrio: (( ) => (Math.random() + 1).toString(36).substring(2))(), // Genera un barrio aleatorio
  CodigoPostal: 1, 
  FechaDeAlta: (( ) => (Math.random() + 1).toString(36).substring(2))(),
};
const contribuyenteModificacion = {
  Nro_Contribuyente: 1,
  Nombre: (( ) => (Math.random() + 1).toString(36).substring(2))(), // Genera un nombre aleatorio
  Domicilio: (( ) => (Math.random() + 1).toString(36).substring(2))(), // Genera un domicilio aleatorio
  Barrio: (( ) => (Math.random() + 1).toString(36).substring(2))(), // Genera un barrio aleatorio
  CodigoPostal: 1, 
  FechaDeAlta: (( ) => (Math.random() + 1).toString(36).substring(2))(),
};

const inmuebleAlta = {
  Numero_Catastral: 1,
  Ubicacion: "Avenida Juarez Ciudad B",
  Zona: "Comercial",
  Tipo: "Local comercial",
  Numero_Contribuyente: 1,
  FechaRegCatastro: "2023-04-10",
};

// test route/contribuyente GET
describe("GET /api/contribuyentes", () => {
  it("Deberia devolver todos los contribuyentes", async () => {
    const res = await request(app).get("/api/contribuyentes");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
     expect.objectContaining({
      Items: 
      expect.arrayContaining([
        expect.objectContaining({
          Nro_Contribuyente: expect.any(Number),
          Nombre: expect.any(String),
          Domicilio: expect.any(String),
          CodigoPostal: expect.any(Number),
          Barrio: expect.any(String),
          FechaDeAlta: expect.any(String),
        })
      ]),
      RegistrosTotal:  expect.any(Number) 
     })
    );
  });
});

// test route/contribuyentes/:id GET
describe("GET /api/contribuyentes/:id", () => {
  it("Deberia devolver el contribuyente con el Nro_Contribuyente 1", async () => {
    const res = await request(app).get("/api/contribuyentes/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Nro_Contribuyente: expect.any(Number),
        Nombre: expect.any(String),
        Domicilio: expect.any(String),
        CodigoPostal: expect.any(Number),
        Barrio: expect.any(String),
        FechaDeAlta: expect.any(String),
      })
    );
  });
});

// test route/contribuyentes/:id PUT
describe("PUT /api/contribuyentes/:id", () => {
  it("Deberia devolver el Nro_Contribuyente con el id 1 modificado", async () => {
    const res = await request(app).put("/api/contribuyentes/1").send(contribuyenteModificacion);
    expect(res.statusCode).toEqual(200);
  });
});

// test route/contribuyentes/:id DELETE
 describe("DELETE /api/contribuyentes/:id", () => {
   it("Deberia devolver el contribuyente con el id 1 borrado", async () => {
     const a = await request(app).delete("/api/inmuebles/1");
     const res = await request(app).delete("/api/contribuyentes/1");
    expect(res.statusCode).toEqual(200);
    
//    expect(res.body).toEqual(
//    expect.objectContaining({
//     Nro_Contribuyente: expect.any(Number),
//     Nombre: expect.any(String),
//     CodigoPostal: expect.any(Number),
//   })
// );

  });
 });

 
// test route/contribuyentes POST
describe("POST /api/contribuyentes", () => {
  it("Deberia devolver el contribuyente que acabo de crear", async () => {
    const res = await request(app).post("/api/contribuyentes").send(contribuyenteAlta);
    const as = await request(app).post("/api/inmuebles").send(inmuebleAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Nro_Contribuyente: expect.any(Number),
        Nombre: expect.any(String),
        Domicilio: expect.any(String),
        CodigoPostal: expect.any(Number),
        Barrio: expect.any(String),
        FechaDeAlta: expect.any(String),
      })
      );
  });

});
