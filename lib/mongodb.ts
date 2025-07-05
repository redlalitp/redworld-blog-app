import { MongoClient } from "mongodb";

// Regular user connection
const uri = process.env.MONGODB_URI!;
const options = {};

// Admin user connection
const adminUri = process.env.MONGODB_ADMIN_URI!;
const adminOptions = {};

declare global {
  // Ensure TS doesn't complain about custom properties on global
  var _mongoClientPromise: Promise<MongoClient> | undefined;
  var _mongoAdminClientPromise: Promise<MongoClient> | undefined;
}

// ---------- Client for general app use ----------
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

// ---------- Client for admin actions ----------
let adminClient: MongoClient;
let adminClientPromise: Promise<MongoClient>;

if (!global._mongoAdminClientPromise) {
  adminClient = new MongoClient(adminUri, adminOptions);
  global._mongoAdminClientPromise = adminClient.connect();
}
adminClientPromise = global._mongoAdminClientPromise;

export { clientPromise, adminClientPromise };
