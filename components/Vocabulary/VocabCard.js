import { DeleteIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

const VocabCard = ({
  word,
  reading,
  meanings,
  frequency,
  status,
  handleRemove,
}) => {
  return (
    <>
      <div
        key={word + reading + meanings}
        className="flex flex-col relative items-center px-12 md:px-20 py-4 border border-gray-700 rounded-md"
      >
        <span className="flex flex-col">
          <p className="pl-1 text-sm">{reading}</p>
          <p className="text-3xl">{word}</p>
        </span>
        <span>
          {meanings
            ?.flatMap((definition) => definition)
            .map((definition, j) => {
              return (
                <span key={definition + j}>
                  {definition}
                  {j !==
                    meanings?.flatMap((definition) => definition).length -
                      1 && <>, &nbsp;</>}
                </span>
              );
            })}
        </span>
        {frequency > 0 && (
          <div className="absolute left-3 top-3 rounded-md px-2 py-1 bg-secondary">
            #{frequency}
          </div>
        )}
        <span className="absolute right-3 top-3">
          <Menu strategy="fixed">
            <MenuButton
              px={4}
              py={2}
              transition="all 0.2s"
              borderRadius="md"
              borderWidth="1px"
              placement="bottom-end"
              _hover={{ bg: "gray.400" }}
              _expanded={{ bg: "secondary.100" }}
              _focus={{ boxShadow: "outline" }}
            >
              ...
            </MenuButton>
            <MenuList bgColor={"gray.800"}>
              <MenuItem
                _highlighted={{ bg: "secondary.100" }}
                _focus={{ bg: "secondary.100" }}
                _hover={{ bg: "secondary.100" }}
                onClick={() => handleRemove(word)}
              >
                Remove
                <DeleteIcon ml={"2"} />
              </MenuItem>
            </MenuList>
          </Menu>
        </span>
      </div>
    </>
  );
};

export default VocabCard;
