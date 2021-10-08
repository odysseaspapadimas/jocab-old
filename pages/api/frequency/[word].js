const fs = require("fs");
import { parse } from "fast-csv";

export default async function Word(req, res) {
  let freqList = [];
  let freqNumber = 0;
  fs.createReadStream("./public/freq.csv")
    .pipe(parse())
    .on("error", (error) => console.error(error))
    .on("data", (row) => freqList.push(row))
    .on("end", () => {
      for (let i = 0; i < freqList.length; i++) {
        if (freqList[i][0] === req.query.word) {
          freqNumber = i + 1;
          break;
        }
      }
      try {
        if (freqNumber === 0) {
          res.status(200).send({ msg: "Word not found" });
        } else {
          res.status(200).send({ freq: freqNumber });
        }
      } catch (error) {}
    });
}

export const config = {
  api: {
    externalResolver: true,
  },
};
