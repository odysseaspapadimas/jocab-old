import Tesseract from "tesseract.js";

export default async function handler(req, res) {
  Tesseract.recognize("./public/jp.png", "jpn", {
    logger: (m) => console.log(m),
  }).then(({ data: { text } }) => {
    console.log(text);
  });
}
