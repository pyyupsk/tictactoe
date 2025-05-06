import { useSeoMeta } from "@unhead/vue";

type CommonMetaData = {
  description: string;
  title: string;
};

const BASE_URL = import.meta.env.DEV ? "http://localhost:3000" : "https://tictactoe.fasu.dev";

const DEFAULT_AUTHOR = "@pyyupsk";
const DEFAULT_IMAGE = "/opengraph-image.svg";

export function useMetaData({ description, title }: CommonMetaData) {
  return useSeoMeta({
    author: DEFAULT_AUTHOR,
    colorScheme: "only light",
    description,
    ogDescription: description,
    ogImageAlt: title,
    ogImageHeight: 630,
    ogImageUrl: DEFAULT_IMAGE,
    ogImageWidth: 1200,
    ogSiteName: title,
    ogTitle: title,
    ogType: "website",
    ogUrl: BASE_URL,
    robots: {
      follow: true,
      index: true,
    },
    title,
    twitterCard: "summary_large_image",
    twitterDescription: description,
    twitterImage: DEFAULT_IMAGE,
    twitterImageAlt: title,
    twitterImageHeight: 630,
    twitterImageWidth: 1200,
    twitterTitle: title,
  });
}
