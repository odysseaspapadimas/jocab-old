import clientPromise from "../../../lib/mongodb";

export default async function (req, res) {
  const { uid, word } = req.body;
  console.log(uid, word, 'leasdkjasklfjlkj')
  const client = await clientPromise;

  const db = client.db();

  const response = await db
    .collection("vocab")
    .updateOne({ uid }, { $pull: { vocab: { word } } });
  console.log(response);
  res.status(200).json({ msg: "ok" });
}
