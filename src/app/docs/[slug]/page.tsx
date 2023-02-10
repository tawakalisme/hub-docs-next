import TableOfContent from "@/components/TableOfContent";
import Content from "@/components/Content";
import Link from "next/link";
import client from "@/utils/apollo-client";
import { gql } from "@apollo/client";
import { parseISO, format } from "date-fns";
import Loading from "./loading";
import { Suspense } from "react";
import Search from "@/components/Search";

async function getDocs() {
  // const { data } = await client.query({
  //   query: gql`
  //     query Documentations {
  //       documentations {
  //         data {
  //           id
  //           attributes {
  //             slug
  //             title
  //           }
  //         }
  //       }
  //     }
  //   `,
  // });

  // return data.documentations.data;
  const res = await fetch(`${process.env.STRAPI_URL}/documentations`);
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const result = res.json();
  return result;
}

async function getDoc(slug: any) {
  // const { data } = await client.query({
  //   query: gql`
  //     query Doc($slug: String) {
  //       findSlug(modelName: "documentation", slug: ${slug}) {
  //         ... on DocumentationEntityResponse {
  //           data {
  //             id
  //             attributes {
  //               title
  //             }
  //           }
  //         }
  //       }
  //     }
  //   `,
  // });
  // return data;
  const res = await fetch(
    `${process.env.STRAPI_URL}/slugify/slugs/documentation/${slug}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function generateStaticParams() {
  const res = await getDocs();
  const results = res.data;
  return results.map((doc: any) => ({
    slug: doc.attributes.slug,
  }));
}

const Date = ({ dateString }: { dateString: string }) => {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, "d LLLL yyyy")}</time>;
};

export default async function Docs({ params: { slug } }: any) {
  const doc = await getDoc(slug);
  const data = await doc.data.attributes;

  const results = await getDocs();
  const allDocs = await results.data;
  return (
    <div className="container pt-[104px] pb-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <div className="relative">
          <ul className="sticky top-[104px]">
            {allDocs.map((doc: any) => (
              <li key={doc.id}>
                <Link
                  href={`/docs/${doc.attributes.slug}`}
                  className={
                    doc.attributes.slug === data.slug ? "font-bold" : ""
                  }
                >
                  {doc.attributes.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Suspense fallback={<Loading />}>
          <div className="lg:col-span-2">
            <h1 className="mb-4 text-4xl font-bold">{data.title}</h1>
            <Date dateString={data.createdAt} />
            <hr className="my-4 border-t border-ycp-primary/20" />
            <Content content={data.content} />
          </div>
        </Suspense>
        <TableOfContent />
      </div>
    </div>
  );
}
