const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId, upsert } = require("mongodb");
const port = process.env.port || 5000;
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());

const uri =
  "mongodb+srv://TaskMANAGER:WWdVhFcgLwskZOcU@cluster0.wng5cg8.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // await client.connect();
    const database = client.db("taskHandler");
    const taskCollection = database.collection("tasks");

    // ! adding task api
    app.post("/api/task", async (req, res) => {
      const data = req.body;

      const result = await taskCollection.insertOne(data);

      res.send(result);

      console.log("data from post = ", data);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", async (req, res) => {
  res.send({ message: "server is running" });
});

app.listen(port, () => {
  console.log(`listening from port ${port}`);
});
