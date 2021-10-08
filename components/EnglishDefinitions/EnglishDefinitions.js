import EnglishDefinition from "./EnglishDefinition";

const EnglishDefinitions = ({ senses }) => {
  return (
    <div className="space-y-2">
      {senses.map((sense, i) => {
        return <EnglishDefinition key={sense + i} sense={sense} index={i+1} />;
      })}
    </div>
  );
};

export default EnglishDefinitions;
