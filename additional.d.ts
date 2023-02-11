/// <reference types="./environment" />
declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_MELLISEARCH_URL: string;
    NEXT_PUBLIC_MELLISEARCH_API: string;
    NEXT_PUBLIC_ALGOLIA_APPLICATION_ID: string;
    NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY: string;
    ALGOLIA_ADMIN_KEY: string;
  }
}
