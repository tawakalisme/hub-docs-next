"use client";

import { useEffect, useState } from "react";
import slugify from "react-slugify";

export default function Content(props: any) {
  const [content, setContent] = useState(props.content);

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const headings = doc.querySelectorAll<HTMLElement>("h2, h3, h4, h5, h6");
    headings.forEach((heading) => {
      const id = slugify(heading.innerText);
      heading.setAttribute("id", id);
    });
    setContent(doc.body.innerHTML);
    // update the htmlString with updatedHtmlString
  }, [content]);

  return (
    <div
      className="prose lg:col-span-3"
      dangerouslySetInnerHTML={{ __html: content }}
    ></div>
  );
}
