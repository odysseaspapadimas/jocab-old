import clientPromise from "../../lib/mongodb";

export default function Word(req, res) {
  const userExists = async (uid) => {
    const client = await clientPromise;

    // client.db() will be the default database passed in the MONGODB_URI
    // You can change the database by calling the client.db() function and specifying a database like:
    // const db = client.db("myDatabase");
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands
    const db = client.db();
    //const isConnected = await client.isConnected()
    const user = await db.collection("users").find({ _id: uid }).count();
    if (user > 0) {
      return true;
    }

    return false;
  };

  const createUser = async ({ uid, displayName, email }) => {
    const client = await clientPromise;

    // client.db() will be the default database passed in the MONGODB_URI
    // You can change the database by calling the client.db() function and specifying a database like:
    // const db = client.db("myDatabase");
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands
    const db = client.db();

    await db.collection("users").insertOne({
      _id: uid,
      displayName,
      email,
      dateCreated: Date.now(),
    });

    res.status(201).send({ msg: "User successfully created" });
  };

  if (req.method === "POST") {
    const user = req.body;

    //returns a promise
    userExists(user.uid).then((result) => {
      const doesUserExist = result;
      if (doesUserExist) {
        res.status(200).send({ msg: `User already exists` });
      } else {
        createUser(user);
      }
    });
  }
}
