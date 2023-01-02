process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("./app");
let items = require("./fakeDb");

let popsicle = { name: "popsicle", price: 1.25 };

beforeEach(() => {
  items.push(popsicle);
});

afterEach(() => {
  items.length = 0;
});

describe("GET /items", () => {
  test("Get all items", async () => {
    const res = await request(app).get("/items");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ items: [popsicle] });
  });
});

describe("POST /items", () => {
  test("Add item", async () => {
    const res = await request(app)
      .post("/items")
      .send({ name: "cheerios", price: 3.4 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ item: { name: "cheerios", price: 3.4 } });
  });
});

describe("GET /items/:name", () => {
  test("Get item", async () => {
    const res = await request(app).get(`/items/${popsicle.name}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ item: { name: "popsicle", price: 1.25 } });
  });
});

describe("PATCH /items/:name", () => {
  test("Update item", async () => {
    const res = await request(app)
      .patch(`/items/${popsicle.name}`)
      .send({ name: "cheerios", price: 3.4 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ item: { name: "cheerios", price: 3.4 } });
  });
  test("404 Response for invalid item", async () => {
    const res = await request(app)
      .patch("/items/icecream")
      .send({ name: "cheerios", price: 3.4 });
    expect(res.statusCode).toBe(404);
  });
});

describe("DELETE /items/:name", () => {
  test("Delete item", async () => {
    const res = await request(app).delete(`/items/${popsicle.name}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "Deleted" });
  });
  test("404 Response for invalid item", async () => {
    const res = await request(app).delete("/items/icecream");
    expect(res.statusCode).toBe(404);
  });
});
