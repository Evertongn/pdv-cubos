const knex = require('knex')({
    client: "pg",
    connection: {
        connectionString: process.env.POSTGRES_URL
    }
})


module.exports = knex