import { Suspense } from "react";
import Loading from "./loading";
import BackButton from "@/components/BackButton";
import TableOfContent from "@/components/TableOfContent";
import slugify from "react-slugify";
import Content from "@/components/Content";

async function getDocs() {
  const res = await fetch(`${process.env.STRAPI_URL}/documentations`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

async function getDoc(slug: any) {
  const res = await fetch(
    `${process.env.STRAPI_URL}/slugify/slugs/documentation/${slug}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function generateStaticParams() {
  const results = await getDocs();
  const data = await results.data;
  return data.map((doc: any) => ({
    slug: doc.attributes.slug,
  }));
}

export default async function Docs({ params: { slug } }: any) {
  const doc = await getDoc(slug);
  const data = await doc.data.attributes;

  // const processedContent = await remark().use(html).process(data.content);
  // const contentHtml = processedContent.toString();
  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton className="mb-4" />
      <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
      <Suspense fallback={<Loading />}>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div>
            <TableOfContent />
          </div>
          <Content content={data.content} />
        </div>
      </Suspense>
    </div>
  );
}
