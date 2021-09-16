exports.up = function (knex) {
  return knex.schema.createTable("users", (user) => {
    user.increments("user_id");
    user.string("username", 100).unique().notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
