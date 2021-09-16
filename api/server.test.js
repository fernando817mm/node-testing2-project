const request = require("supertest");
const server = require("./server");
const db = require("../data/dataConfig");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe("Users End Points", () => {
  describe("[POST] | /users", () => {
    test("returns correct object", async () => {
      const inserted = await request(server)
        .post("/users")
        .send({ username: "kendrick" });
      expect(inserted.body).toMatchObject({ user_id: 5, username: "kendrick" });
    });
    test("returns err status 422 if username is not provided", async () => {
      const inserted = await request(server).post("/users").send({});
      expect(inserted.status).toBe(422);
    });
  });
});
