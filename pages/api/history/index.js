import clientPromise from "../../../lib/mongodb";

export default async function (req, res) {
  const client = await clientPromise;

  const db = client.db();
}
