import clientPromise from "../../../lib/mongodb";

export default async function uid(req, res) {
  //const uid = req.query.uid;
  const { uid } = req.query;
  const client = await clientPromise;

  const db = client.db();
  if (req.method === "GET") {
    const vocab = await db.collection("vocab").find({ uid }).toArray();

    res.status(200).send({ vocab });
  } else if (req.method === "PUT") {
    const { word, reading, meaning, frequency, status, dateAdded } = req.body;

    let meanings = [];

    meaning.forEach(
      (item) => meanings.push(item.english_definitions.slice(0, 2)) //Get the first two meanings so I don't crowd the UI based from jpdb.io
    );

    const vocab = await db.collection("vocab").find({ uid }).toArray();

    if (vocab?.length === 0) {
      db.collection("vocab")
        .insertOne({
          uid,
          vocab: [
            {
              word,
              reading,
              meanings,
              frequency,
              status,
              dateAdded,
            },
          ],
        })
        .then((result) => {
          console.log(result);
          res.status(201).send({ message: "Created document and added word" });
        });
    } else {
      db.collection("vocab")
        .updateOne(
          { uid },
          {
            $push: {
              vocab: { word, reading, meanings, frequency, status, dateAdded },
            },
          }
        )
        .then((result) => {
          res.status(201).send({ message: "Word successfully added" });
        });
    }
  } else {
    const { word } = req.body;
    const wordCount = await db
      .collection("vocab")
      .find({ uid, "vocab.word": word })
      .count();
    if (wordCount > 0) {
      res.status(200).send({ message: "Word is on list", onList: true });
    } else {
      res.status(200).send({ message: "Word is not on list", onList: false });
    }
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
