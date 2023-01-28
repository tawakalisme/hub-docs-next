"use client";

import { useEffect, useState } from "react";
import slugify from "react-slugify";
import { useHeadsObserver } from "@/utils/hooks";

export default function TableOfContent(props: any) {
  const [headings, setHeadings] = useState<any[]>([]);
  const { activeId } = useHeadsObserver();

  useEffect(() => {
    const elements: any = Array.from(
      document.querySelectorAll<HTMLElement>("h2, h3, h4")
    ).map((elem) => ({
      id: slugify(elem.innerText),
      text: elem.innerText,
      level: Number(elem.nodeName.charAt(1)),
    }));
    setHeadings(elements);
  }, []);

  const getClassName = (level: number) => {
    switch (level) {
      case 2:
        return "text-bold";
      case 3:
        return "text-sm ml-4";
      case 4:
        return "text-xs ml-8";
      default:
        return undefined;
    }
  };

  console.log("active: " + activeId);

  return (
    <div className="sticky top-8">
      <p className="text-sm font-bold">Table of Contents</p>
      <>
        <ul>
          {headings.map((heading) => (
            <li key={heading.id} className={`${getClassName(heading.level)}`}>
              <a
                href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector<HTMLElement | any>(`#${heading.id}`)
                    .scrollIntoView({
                      behavior: "smooth",
                    });
                }}
                className={`${
                  activeId === heading.text ? "font-bold" : "font-normal"
                } duration-300 ease-out`}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </>
    </div>
  );
}
