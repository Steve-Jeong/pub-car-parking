import {
  MongoClient,
} from "https://deno.land/x/atlas_sdk@v1.0.3/mod.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";

const {END_POINT, DATA_SOURCE, API_KEY } = config()

interface CarSchema {
  name: string
  printCreatedAt: string
  createdAt: number
}


const client = new MongoClient({
  endpoint: END_POINT,
  dataSource: DATA_SOURCE, // e.g. "Cluster0"
  auth: {
    apiKey: API_KEY,
  },
});


const db = client.database("test");
const CarParkModel = db.collection<CarSchema>("cars");

export { CarParkModel}