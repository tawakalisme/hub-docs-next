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
          <h1 className="font-bold text-6xl leading-tight text-ycp-primary">
            Welcome to The Docs!
          </h1>
          <p className="">
            Hub Docs is a one stop documentation for YCP&apos;s Hub for
            professionals.
          </p>
        </div>
      </section>
      <section id="docs">
        <h2 className="font-bold text-4xl leading-tight text-ycp-primary">
          Docs
        </h2>
        <p>Essentials documentations. Great for first time users.</p>
        {res.map((doc: any) => (
          <div key={doc.id} className="mt-4">
            <h3 className="font-bold text-xl">
              <Link href={`/docs/${doc.attributes.slug}`}>
                {doc.attributes.title}
              </Link>
            </h3>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
