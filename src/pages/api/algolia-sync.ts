// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import algoliasearch from "algoliasearch/lite";
import { SearchIndex } from "algoliasearch";

export default async function algoliaSync(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // initializing the Algolia client with the secret keys
  if (req.method === "POST") {
    // Process a POST request
    const algoliaClient = algoliasearch(
      process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID,
      process.env.ALGOLIA_ADMIN_KEY
    );

    // setting the Algolia index related to your blog
    const index: any = algoliaClient.initIndex(
      "development_api::documentation.documentation"
    );
    const pageSize = 10;

    // retrieving all posts from the headless CMS
    const allDocs = await fetch(`${process.env.STRAPI_URL}/documentations`);
    if (!allDocs.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }
    const allDocsResponse = await allDocs.json();

    // the number of all posts available
    const dataCount = allDocsResponse.meta.pagination.total;

    // iterating over the posts because the allPosts query is paginated
    // by default
    for (let page = 0; page < Math.ceil(dataCount / pageSize); page++) {
      const docs = await fetch(
        `${process.env.STRAPI_URL}/documentations?pagination[page]=${page}&pagination[size]=${pageSize}`
      );
      if (!docs.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
      }
      const docsResponse = await docs.json();
      // converting tha data retrieved by the headless CMS
      // into the desired Algolia format
      const algoliaPosts = docsResponse.data.map((doc: any) => {
        return {
          objectID: doc.id,
          title: doc.attributes.title,
          excerpt: doc.attributes.excerpt,
          slug: doc.attributes.slug,
          date: doc.attributes.updatedAt,
        };
      });
      // saving the post info to Algolia
      await index.saveObjects(algoliaPosts);
    }
    res.json(`Content successfully synchronized with Algolia search`);
    res.end();
  }
}
