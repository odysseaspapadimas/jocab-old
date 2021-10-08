import clientPromise from "../../../lib/mongodb";

export default async function uid(req, res) {
  let uid;
  if (req.headers.authorization) {
    uid = req.headers.authorization;
  } else {
    uid = req.query.uid;
  }
  const client = await clientPromise;

  const db = client.db();
  const vocab = await db.collection("vocab").find({ uid }).toArray();

  res.status(200).send({ vocab });
}
