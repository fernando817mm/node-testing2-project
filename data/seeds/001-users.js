exports.seed = function (knex, Promise) {
  return knex("users")
    .truncate()
    .then(function () {
      return knex("users").insert([
        { username: "fernando817mm" },
        { username: "fabian600jm" },
        { username: "aliyah" },
        { username: "benito" },
      ]);
    });
};
