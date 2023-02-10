import Link from "next/link";
import { gql } from "@apollo/client";
import client from "@/utils/apollo-client";

async function getDocs() {
  // const { data } = await client.query({
  //   query: gql`
  //     query Documentations {
  //       documentations {
  //         data {
  //           id
  //           attributes {
  //             title
  //             excerpt
  //             slug
  //             updatedAt
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

const Home = async () => {
  const result = await getDocs();
  const res = result.data;
  return (
    <div className="container relative pt-[104px] pb-8">
      <section id="hero">
        <div className="max-w-xl py-32">
          <h1 className="text-6xl font-bold leading-tight text-ycp-primary">
            Welcome to Hub Docs!
          </h1>
          <p className="">
            Hub Docs is a one stop documentation for YCP&apos;s Hub for
            professionals.
          </p>
        </div>
      </section>
      <section id="docs">
        <h2 className=" text-4xl font-bold leading-tight text-ycp-primary">
          Docs
        </h2>
        <p>Essentials documentations. Great for first time users.</p>
        <div className="mt-4 grid grid-cols-4 gap-4 lg:gap-8">
          {res.map((doc: any) => (
            <Link
              href={`/docs/${doc.attributes.slug}`}
              key={doc.id}
              className="group rounded-lg border border-transparent bg-white p-4 drop-shadow-lg duration-100 ease-out hover:border-gray-200 hover:drop-shadow-xl"
            >
              <h3 className="text-xl font-bold">{doc.attributes.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-3">
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
