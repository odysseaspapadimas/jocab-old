import clientPromise from "../../../lib/mongodb";

export default async function (req, res) {
  const client = await clientPromise;

  const db = client.db();

  //const { uid, query } = req.body;
  const { uid, query } = req.body;

  const response = await db.collection("history").insertOne({ uid, query });
  console.log(response);
  res.status(200).send({ response });
}
