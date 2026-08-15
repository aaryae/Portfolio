import { useEffect, useState } from "react";

// The desktop needs room for windows, a taskbar and a shell. Below this it stops
// being an operating system and starts being a bad website, so phones and small
// tablets get the plain portfolio instead.
const QUERY = "(max-width: 880px)";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.matchMedia(QUERY).matches);

  useEffect(() => {
    const query = window.matchMedia(QUERY);
    const onChange = (event) => setIsMobile(event.matches);
    setIsMobile(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}
