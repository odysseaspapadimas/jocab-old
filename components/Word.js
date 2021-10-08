import { useEffect, useState } from "react";
import { autofurigana } from "../lib/autofurigana";

import { isJapanese } from "../lib/isJapanese";

const Word = ({ word, reading }) => {
  const [okurigana, setOkurigana] = useState("");

  useEffect(() => {
    if (
      word === undefined ||
      !isJapanese(word) ||
      !isJapanese(reading) ||
      reading === undefined
    )
      return;
    setOkurigana(autofurigana(word, reading));
  }, [word]);

  return (
    <div className="flex items-center text-3xl ">
      {okurigana.length > 0 ? (
        <>
          {okurigana.map((array, i) => {
            if (array[1] !== null) {
              return (
                <div key={array[0] + i} className="flex flex-col">
                  <p className="pl-1 text-sm">{array[1]}</p>
                  <p>{array[0]}</p>
                </div>
              );
            } else {
              return (
                <p key={array[0] + i} className="self-end">
                  {array[0]}
                </p>
              );
            }
          })}
        </>
      ) : (
        <p>{reading}</p>
      )}
    </div>
  );
};

export default Word;
