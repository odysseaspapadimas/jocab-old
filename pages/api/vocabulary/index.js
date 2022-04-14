import clientPromise from "../../../lib/mongodb";

export default async function uid(req, res) {
  let uid;
  if (req.headers.authorization) {
    uid = req.headers.authorization;
  } else {
    uid = req.query.uid;
  }
  const client = await clientPromise;

  console.log(req.headers);
  console.log(uid, 'uid')

  const db = client.db();
  const vocab = await db.collection("vocab").findOne({ uid });

  res.status(200).send(vocab);
}
