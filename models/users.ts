import {
  MongoClient,
} from "https://deno.land/x/atlas_sdk@v1.0.3/mod.ts";


interface UserSchema {
  name: string
  email: string
}


const client = new MongoClient({
  endpoint: "https://data.mongodb-api.com/app/data-hmjpu/endpoint/data/v1",
  dataSource: "Cluster0", // e.g. "Cluster0"
  auth: {
    apiKey: "zmWGmBhs8KMVVfan8h9uo808DzQRCeaf68P1ZKV9VyrrKUZh16HzagSeKrANaYaD",
  },
});


const db = client.database("test");
const UsersModel = db.collection<UserSchema>("users");

export { UsersModel}