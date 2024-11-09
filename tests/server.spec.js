const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
  it("Debería devolver un status code 200 y un arreglo con al menos un objeto al hacer GET /cafes", async () => {
    const response = await request(server).get("/cafes");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("Debería devolver un status code 200 y un arreglo con al menos un objeto al hacer GET /cafes", async () => {
    const response = await request(server).get("/cafes");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("Debería devolver un código 404 al intentar eliminar un café con un id que no existe", async () => {
    const response = await request(server)
        .delete("/cafes/999")
        .set("Authorization", "some-token");
    expect(response.status).toBe(404);
  });

  it("Debería agregar un nuevo café y devolver un código 201 al hacer POST /cafes", async () => {
    const nuevoCafe = { id: 5, nombre: "Latte" };
    const response = await request(server)
        .post("/cafes")
        .send(nuevoCafe);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(expect.arrayContaining([nuevoCafe]));
  });

  it("Debería devolver un código 400 si el id del parámetro no coincide con el id del café en el payload al hacer PUT /cafes/:id", async () => {
    const cafeActualizado = { id: 6, nombre: "Espresso" };
    const response = await request(server)
        .put("/cafes/5")
        .send(cafeActualizado);
    expect(response.status).toBe(400);
  });

});
