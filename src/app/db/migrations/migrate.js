const postgres = require("postgres")

const pushNMigration = async () => {
    const migrationClient = postgres(process.env.DB_CONNECTION_STRING)

}