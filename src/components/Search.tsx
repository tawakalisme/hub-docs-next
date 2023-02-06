"use client";

import algoliasearch from "algoliasearch/lite";
import {
  connectSearchBox,
  connectStateResults,
  InstantSearch,
} from "react-instantsearch-dom";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY
);

/*
*
*
* NOTE: This search bar is still buggy
* I don't know how to make it disappear when it's not focused 😅
*
*
*/

export default function Search() {
  return (
    <div className={"algolia-search"}>
      <InstantSearch
        searchClient={searchClient}
        indexName="development_api::documentation.documentation"
      >
        <CustomSearchBox />
        <CustomSearchHits />
      </InstantSearch>
    </div>
  );
}

const CustomSearchBox = connectSearchBox(({ refine }: any) => {
  return (
    <div className="bg-white/20 rounded-md">
      <input
        className="bg-white/20 rounded-md px-4 py-2 focus:outline-none text-white placeholder:text-white/50 min-w-[320px]"
        type="text"
        placeholder="Search..."
        onChange={(e) =>
          e.currentTarget.value.length >= 3 ? refine(e.currentTarget.value) : ""
        }
      />
    </div>
  );
});

const CustomSearchHits = connectStateResults(
  ({ searchState, searchResults }: any) => {
    // checking if the query length is >= 3
    // (since 3 is the minimum Algolia query length)
    const validQuery = searchState.query?.length >= 3;

    return searchState.query && validQuery ? (
      <div className="flex flex-col gap-4 absolute bg-white p-4 mt-1 border-white rounded-lg w-max shadow-lg min-w-[320px]">
        {searchResults?.hits.length === 0 && (
          <div className="text-black">No results found!</div>
        )}
        {searchResults?.hits.length > 0 &&
          searchResults.hits.map((hit: any) => (
            <div key={hit.objectID} className="text-black">
              <a href={`/docs/${hit.slug}`} className="hover:text-ycp-primary">
                {hit.title}
              </a>
            </div>
          ))}
      </div>
    ) : null;
  }
);
