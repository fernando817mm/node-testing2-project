const User = require("./users-model");
const db = require("../../data/dataConfig");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

test("sanity check", () => {
  expect(process.env.NODE_ENV).toBe("testing");
});

describe("Users Model", () => {
  describe("[POST] | /users", () => {
    test("creates a new user in the database", async () => {
      await User.insert({ username: "naruto" });
      const users = await db("users");

      expect(users).toHaveLength(5);
    });

    test("checks if it returns the object sent with an id", async () => {
      const inserted = await User.insert({ username: "naruto" });
      expect(inserted).toMatchObject({ user_id: 5, username: "naruto" });
    });
  });
  describe("[DELETE] | /users/:id", () => {
    test("deletes user from database", async () => {
      await User.remove(4);
      const users = await db("users");
      expect(users).toHaveLength(3);
    });
    test("returns the deleted user", async () => {
      const deletedUser = await User.remove(4);
      expect(deletedUser).toMatchObject({ user_id: 4, username: "benito" });
    });
  });
});
