export type SearchResultItem = {
  kind: string,
  etag: string,
  id: {
    kind: string,
    videoId: string
  },
  snippet: {
    channelId: string,
    channelTitle: string,
    description: string,
    liveBroadcastContent: string,
    publishTime: string,
    publishedAt: string,
    title: string,
    thumbnails: {
      default: {
        url: string,
        width: number,
        height: number
      },
      high: {
        url: string,
        width: number,
        height: number
      },
      medium: {
        url: string,
        width: number,
        height: number
      }
    }
  }
};

export type SearchResults = {
  kind: string,
  etag: string,
  nextPageToken: string,
  regionCode: string
  pageInfo: {
    resultsPerPage: number,
    totalResults: number
  },
  items: SearchResultItem[]
};