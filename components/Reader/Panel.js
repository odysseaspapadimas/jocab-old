import { useEffect, useRef, useState } from "react";

const Panel = ({
  panelsLength,
  panel,
  index,
  lastPanel,
  setLastPanel,
  scrollToLastPanel,
}) => {
  const imgRef = useRef();
  const isVisible = useOnScreen(imgRef);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (lastPanel === index + 1 && hasLoaded) {
      scrollToLastPanel(index, imgRef);
    }
  }, [hasLoaded]);

  useEffect(() => {
    if (isVisible && hasLoaded) {
      if (index + 1 === panelsLength) {
        console.log(index + 1, panelsLength);
        setLastPanel((prev) => ({ manga: prev.manga, panel: 0 }));
      } else {
        setLastPanel((prev) => ({ manga: prev.manga, panel: index }));
      }
    }
  }, [isVisible]);
  return (
    <div className="relative">
      <p
        className="absolute bottom-0 left-0 right-0 mx-auto w-min p-1"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
      >
        {index + 1}/{panelsLength}
      </p>
      <img
        ref={imgRef}
        src={URL.createObjectURL(panel)}
        className="h-full w-full"
        onLoad={() => setHasLoaded(true)}
        alt=""
      />
    </div>
  );
};

export default Panel;

function useOnScreen(ref) {
  const [isIntersecting, setIntersecting] = useState(false);

  const observer = new IntersectionObserver(([entry]) =>
    setIntersecting(entry.isIntersecting)
  );

  useEffect(() => {
    observer.observe(ref.current);
    // Remove the observer as soon as the component is unmounted
    return () => {
      observer.disconnect();
    };
  }, []);

  return isIntersecting;
}
