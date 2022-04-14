import { extendTheme } from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Panel from "../components/Reader/Panel";
import Search from "../components/Reader/Search";
import ResultCard from "../components/ResultCard";
import useLocalStorage from "../hooks/useLocalStorage";
import { isJapanese } from "../lib/isJapanese";

const reader = () => {
  const [panels, setPanels] = useState([]);
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [inputProps, setInputProps] = useState({
    directory: "",
    webkitdirectory: "",
    multiple: false,
  });
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (window.outerWidth < 1024) {
      setInputProps({ directory: "", webkitdirectory: "", multiple: true });
    }
  }, []);

  const resultsRef = useRef();

  useOnClickOutside(resultsRef, () => setShowResults(false));

  const handleUpload = (e) => {
    setPanels(e.target.files);
    console.log(e.target.files);
    console.log(
      e.target.files[0].webkitRelativePath.split("/")[0].split(" ")[0]
    );
    //If the manga is not the one loaded the previous time set the last panel to 0
    let mangaName = e.target.files[0].webkitRelativePath
      .split("/")[0]
      .split(" ")[0];

    if (mangaName === "") mangaName = e.target.files[0].name.split("_")[0];
    console.log(mangaName);
    if (mangaName !== lastPanel.manga)
      setLastPanel((prev) => ({ manga: mangaName, panel: 0 }));
  };

  const [lastPanel, setLastPanel] = useLocalStorage("lastPanel", {
    manga: "",
    panel: 0,
  });

  const scrollToLastPanel = (index, ref) => {
    if (index + 1 === lastPanel.panel) {
      ref.current.scrollIntoView();
      return;
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0 });
  };

  useEffect(() => {
    console.log(lastPanel, "lastPanel");
  }, [lastPanel.panel]);

  const handlePageChange = (e) => {
    setPage(e.target.value);
    if (e.target.value > panels.length) {
      setPage(panels.length);
    }
  };

  const scrollToPanel = () => {
    document.getElementById(`panel-${page - 1}`).scrollIntoView();
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center">
        <label className="custom-file-upload">
          <input
            type="file"
            {...inputProps}
            className="hidden"
            onChange={handleUpload}
          />
          <div className="p-4 flex justify-center items-center border-gray-700 rounded-md border-2 my-5 cursor-pointer">
            Open Folder
          </div>
        </label>

        {panels.length > 0 && (
          <div className="flex flex-col items-center space-y-2 mb-4">
            <div>
              <input
                type="number"
                className="bg-transparent px-2 w-11 text-center border border-gray-500"
                value={page}
                max={`${panels.length}`}
                onChange={handlePageChange}
                maxLength={panels.length.toString().length}
              />{" "}
              / {panels.length}
            </div>
            <button
              onClick={scrollToPanel}
              className="px-5 py-2 bg-white text-black font-semibold"
            >
              Go
            </button>
          </div>
        )}

        <div className="flex flex-col items-center justify-center space-y-4">
          {panels &&
            panels.length > 0 &&
            Array.from(panels).map((panel, i) => (
              <Panel
                key={i}
                panelsLength={panels.length}
                panel={panel}
                index={i}
                lastPanel={lastPanel.panel}
                setLastPanel={setLastPanel}
                scrollToLastPanel={scrollToLastPanel}
              />
            ))}
        </div>

        <div
          className={`fixed bottom-3 left-0 right-0 rounded-md mx-auto w-1/2 ${
            showResults && "bg-primary"
          }`}
          onFocus={() => setShowResults(true)}
          ref={resultsRef}
        >
          <>
            {results.length > 0 && showResults && (
              <div className="overflow-y-auto h-96 p-2">
                {results.map((result, i) => {
                  if (
                    result.japanese[0].word !== undefined &&
                    isJapanese(result.japanese[0].word) &&
                    isJapanese(result.japanese[0].reading) &&
                    result.japanese[0].reading !== undefined
                  ) {
                    return <ResultCard key={result.slug + i} result={result} />;
                  }
                })}
              </div>
            )}
            <Search setResults={setResults} setShowResults={setShowResults} />
          </>
        </div>

        <button
          className="fixed bottom-8 right-8 rounded-full bg-white text-black h-10 w-10 flex justify-center items-center"
          onClick={scrollToTop}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default reader;

function useOnClickOutside(ref, handler) {
  useEffect(
    () => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  );
}
