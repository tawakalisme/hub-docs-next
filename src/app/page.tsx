import Link from "next/link";

async function getDocs() {
  const res = await fetch(`${process.env.STRAPI_URL}/documentations`);
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const Home = async () => {
  const res = await getDocs();
  const data = res.data;
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="font-bold text-xl">results:</h1>
      {data.map((doc: any) => (
        <div key={doc.id}>
          <h2>
            <Link href={`/docs/${doc.attributes.slug}`}>
              {doc.attributes.title}
            </Link>
          </h2>
        </div>
      ))}
    </main>
  );
};

export default Home;
