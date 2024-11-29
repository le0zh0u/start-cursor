export const getYoutubeVideoId = (link: string) => {
  const url = new URL(link);
  const videoId = url.searchParams.get("v");
  return videoId;
};

export const getTweetId = (link: string) => {
  const url = new URL(link);
  const tweetId = url.pathname.split("/").pop();
  return tweetId;
};
