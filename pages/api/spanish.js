import sdapi from "sdapi";

export default async function handler(req, res) {
  const query = req.query.q;

  const translation = await sdapi.translate(query);
  console.log(translation, query);
  res.status(200).send(translation);
}
