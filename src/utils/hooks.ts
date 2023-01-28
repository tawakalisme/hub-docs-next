import { useEffect, useState, useRef } from "react";

export function useHeadsObserver(): { activeId: string } {
  const observer = useRef<IntersectionObserver>();
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const handleObsever = (entries: any[]) => {
      entries.forEach((entry) => {
        console.log(entry);
        if (entry?.isIntersecting) {
          setActiveId(entry.target.innerText);
        }
      });
    };

    observer.current = new IntersectionObserver(handleObsever, {
      rootMargin: "-20% 0% -35% 0px",
    });

    const elements = document.querySelectorAll("h2, h3, h4");
    elements.forEach((elem) => {
      observer.current?.observe(elem);
    });
    return () => observer.current?.disconnect();
  });

  return { activeId };
}
