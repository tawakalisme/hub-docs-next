"use client";

import { useEffect, useState } from "react";
import slugify from "react-slugify";

export default function Content(props: any) {
  const [content, setContent] = useState(props.content);

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const headings = doc.querySelectorAll<HTMLElement>("h2, h3, h4");
    headings.forEach((heading) => {
      const id = slugify(heading.innerText);
      heading.setAttribute("id", id);
      heading.setAttribute("class", "scroll-mt-28");
      heading.removeAttribute("style");
    });
    const imgs = doc.querySelectorAll<HTMLElement>("img");
    imgs.forEach((img) => {
      img.setAttribute("loading", "lazy");
    });
    setContent(doc.body.innerHTML);
    // update the htmlString with updatedHtmlString
  }, [content]);

  return (
    <div className="prose" dangerouslySetInnerHTML={{ __html: content }}></div>
  );
}
