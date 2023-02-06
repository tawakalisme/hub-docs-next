import Link from "next/link";
import { gql } from "@apollo/client";
import client from "@/utils/apollo-client";

async function getDocs() {
  const { data } = await client.query({
    query: gql`
      query Documentations {
        documentations {
          data {
            id
            attributes {
              title
              excerpt
              slug
              updatedAt
            }
          }
        }
      }
    `,
  });

  return data.documentations.data;

  // const res = await fetch(`${process.env.STRAPI_URL}/documentations`);
  // // Recommendation: handle errors
  // if (!res.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error("Failed to fetch data");
  // }
  // return res.json();
}

const Home = async () => {
  const res = await getDocs();
  return (
    <div className="container pt-[104px] pb-8 relative">
      <section id="hero">
        <div className="py-32 max-w-xl">
          <h1 className="font-bold text-6xl leading-tight text-ycp-primary font-serif">
            Welcome to The Docs!
          </h1>
          <p className="">
            Hub Docs is a one stop documentation for YCP&apos;s Hub for
            professionals.
          </p>
        </div>
      </section>
      <section id="docs">
        <h2 className="font-serif font-bold text-4xl leading-tight text-ycp-primary">
          Docs
        </h2>
        <p>Essentials documentations. Great for first time users.</p>
        <div className="grid grid-cols-4 gap-4 lg:gap-8 mt-4">
          {res.map((doc: any) => (
            <Link
              href={`/docs/${doc.attributes.slug}`}
              key={doc.id}
              className="rounded-lg drop-shadow-lg bg-white p-4 group hover:bg-ycp-orange duration-100 ease-out hover:scale-105"
            >
              <h3 className="font-bold text-xl group-hover:text-white">
                {doc.attributes.title}
              </h3>
              <p className="line-clamp-3 group-hover:text-white text-gray-500 text-sm">
                {doc.attributes.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
