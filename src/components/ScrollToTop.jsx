import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = ({ scrollRef }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    const scrollEl = scrollRef?.current || window;

    // wait until after paint
    requestAnimationFrame(() => {
      scrollEl.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    });
  }, [pathname, scrollRef]);

  return null;
};

export default ScrollToTop;
