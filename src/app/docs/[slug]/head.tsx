async function getPost(slug: string) {
  const res = await fetch(
    `${process.env.STRAPI_URL}/slugify/slugs/documentation/${slug}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Head({ params }: { params: any }) {
  const post = await getPost(params.slug);

  return (
    <>
      <title>{post.data.attributes?.title}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content={post.data.attributes?.excerpt} />
      <link rel="icon" href="/favicon.ico" />
    </>
  );
}
