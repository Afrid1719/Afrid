import mongoose, { mongo } from "mongoose";

const { MONGODB_URI } = process.env;
const options = {};

class Singleton {
  private static _instance: Singleton;
  private clientPromise: Promise<mongo.MongoClient>;

  private constructor() {
    mongoose
      .connect(MONGODB_URI as string, options)
      .then((instance: mongoose.Mongoose) => {
        this.clientPromise = new Promise((resolve) =>
          resolve(instance.connection.getClient())
        );
        if (process.env.NODE_ENV === "development") {
          // In development mode, use a global variable so that the value
          // is preserved across module reloads caused by HMR (Hot Module Replacement).
          if (!global._mongoClientPromise) {
            global._mongoClientPromise = this.clientPromise;
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  public static get instance(): Promise<mongo.MongoClient> {
    if (!this._instance) {
      this._instance = new Singleton();
    }
    return this._instance.clientPromise;
  }
}

const clientPromise = Singleton.instance;

export const connectDB = async () => {
  return await clientPromise;
};

export const disconnectDB = async () => {
  // Implementation for disconnecting from MongoDB if required
};

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
