const request = require("supertest");
const app = require("../index");
const vencimientoAlta = {
  Nro_Cuota: 4,
  Año: (( ) => (Math.random() + 1).toString(36).substring(2))(), // Genera un año aleatorio
  Fecha_1er_vencimiento: (( ) => (Math.random() + 1).toString(36).substring(2))(), // Genera un 1er vencimiento aleatorio
  Fecha_2do_vencimiento: (( ) => (Math.random() + 1).toString(36).substring(2))(), // Genera un 2do vencimiento aleatorio
  Descripcion: (( ) => (Math.random() + 1).toString(36).substring(2))(),
};
const vencimientoModificacion = {
  Nro_Cuota: 4, 
  Año: (( ) => (Math.random() + 1).toString(36).substring(2))(), // Genera un año aleatorio
  Fecha_1er_vencimiento: (( ) => (Math.random() + 1).toString(36).substring(2))(), // Genera un 1er vencimiento aleatorio
  Fecha_2do_vencimiento: (( ) => (Math.random() + 1).toString(36).substring(2))(), // Genera un 2do vencimiento aleatorio
  Descripcion: (( ) => (Math.random() + 1).toString(36).substring(2))(),
};


// test route/vencimientos GET
describe("GET /api/vencimientos", () => {
  it("Deberia devolver todos los vencimientos", async () => {
    const res = await request(app).get("/api/vencimientos");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
     expect.objectContaining({
      Items: 
      expect.arrayContaining([
        expect.objectContaining({
          Nro_Cuota: expect.any(Number),
          Año: expect.any(String),
          Fecha_1er_vencimiento: expect.any(String),
          Fecha_2do_vencimiento: expect.any(String),
          Descripcion: expect.any(String),
        })
      ]),
      RegistrosTotal:  expect.any(Number) 
     })
    );
  });
});

// test route/vencimientos/:id GET
describe("GET /api/vencimientos/:id", () => {
  it("Deberia devolver el vencimiento con el Nro_Cuota 4", async () => {
    const res = await request(app).get("/api/vencimientos/4");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Nro_Cuota: expect.any(Number),
        Año: expect.any(String),
        Fecha_1er_vencimiento: expect.any(String),
        Fecha_2do_vencimiento: expect.any(String),
        Descripcion: expect.any(String),
      })
    );
  });
});

// test route/vencimientos/:id PUT
describe("PUT /api/vencimientos/:id", () => {
  it("Deberia devolver el Nro_Cuota con el id 4 modificado", async () => {
    const res = await request(app).put("/api/vencimientos/4").send(vencimientoModificacion);
    expect(res.statusCode).toEqual(200);
  });
});

// test route/vencimientos/:id DELETE
describe("DELETE /api/vencimientos/:id", () => {
  it("Deberia devolver el vencimiento con el id 4 borrado", async () => {
    const res = await request(app).delete("/api/vencimientos/4");
    expect(res.statusCode).toEqual(200);
    
    // baja logica, no se borra realmente
    // expect(res.body).toEqual(
    //   expect.objectContaining({
    //      Nro_Cuota: expect.any(Number),
    //      Año: expect.any(String),
    //      Fecha_1er_vencimiento: expect.any(String),
    //      Fecha_2do_vencimiento: expect.any(String),
    //      Descripcion: expect.any(String),
    //   })
    // );

  });
});

// test route/vencimientos POST
describe("POST /api/vencimientos", () => {
  it("Deberia devolver el vencimiento que acabo de crear", async () => {
    const res = await request(app).post("/api/vencimientos").send(vencimientoAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Nro_Cuota: expect.any(Number),
        Año: expect.any(String),
        Fecha_1er_vencimiento: expect.any(String),
        Fecha_2do_vencimiento: expect.any(String),
        Descripcion: expect.any(String),
      })
    );
  });
});