import JishoAPI from "unofficial-jisho-api";

export default async function search(req, res) {
  const query = req.query.q;

  const jisho = new JishoAPI();
  let { data: results } = await jisho.searchForPhrase(query);

  res.status(200).send(results);
}
