import { mongo } from "mongoose";

declare global {
  var _mongoClientPromise: Promise<mongo.MongoClient>;
}
