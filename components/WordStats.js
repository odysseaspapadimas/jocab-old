const WordStats = ({ isCommon, jlpt, frequency }) => {
  return (
    <div>
      {(isCommon || jlpt !== undefined || frequency !== undefined) && (
        <div className="text-xs flex space-x-3 my-4 lg:flex-col lg:items-start lg:justify-center lg:space-y-2 lg:space-x-0 lg:mb-0">
          {isCommon && (
            <span className="bg-secondary px-2 rounded-md py-1">
              Common Word
            </span>
          )}

          {jlpt !== undefined && (
            <span className="bg-secondary px-2 rounded-md py-1">
              {jlpt.replace("-", " ")}
            </span>
          )}

          <span className="bg-secondary px-2 rounded-md py-1">
            #{frequency > 0 ? frequency : <span>🤷</span>}
          </span>
        </div>
      )}
    </div>
  );
};

export default WordStats;
