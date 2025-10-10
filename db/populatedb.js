import "dotenv/config"
import { Client } from "pg";

// In real dev workflows, seed scripts are usually idempotent (safe to run multiple times). Examples:
// Use INSERT ... ON CONFLICT DO NOTHING so duplicates don’t get added:

const SQLrunonce = `
CREATE TABLE IF NOT EXISTS usernames (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 255 )
);

INSERT INTO usernames (username) 
VALUES
  ('Bryan'),
  ('Odin'),
  ('Damon');
`;

const SEED = ["Bryan", "Odin", "Damon"];

const SQL = `
BEGIN;

CREATE TABLE IF NOT EXISTS usernames (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(255) NOT NULL
);

TRUNCATE usernames RESTART IDENTITY;

COMMIT;
`;

async function main() {
    console.log("seeding (reset)...");
    const client = new Client({ connectionString: process.env.DATABASE_URL });
    await client.connect();

    // Create if missing, then truncate (safe to re-run)
    await client.query(SQL);

    const placeholders = SEED.map((_, i) => `($${i + 1})`).join(", ");
    await client.query(`INSERT INTO usernames (username) VALUES ${placeholders}`, SEED);

    await client.end();
    console.log("done");
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});

