export interface IId {
  kind: string;
  videoId?: string;
  channelId?: string;
}

export interface IDefault {
  height: number;
  width?: number;
  url?: string;
}

export interface ISnippet {
  channelId: string;
  channelTitle: string;
  description: string;
  liveBroadcastContent: string;
  publishTime: string;
  publishedAt: string;
  title: string;
  thumbnails: { default: IDefault; high: IDefault; medium: IDefault };
}

export interface ISnippetVideoDetail {
  categoryId: string;
  channelId: string;
  channelTitle: string;
  defaultAudioLanguage: string;
  description: string;
  liveBroadcastContent: string;
  localized: { description: string; title: string };
  publishedAt: string;
  tags: string[];
  thumbnails: {
    default: IDefault;
    high: IDefault;
    maxres: IDefault;
    medium: IDefault;
    standard: IDefault;
  };
  title: string;
}

export interface IVideo {
  id: IId;
  kind: string;
  snippet: ISnippet;
}

export interface IVideoDetail {
  contentDetails: any;
  id: string;
  kind: string;
  statistics: {
    commentCount: string;
    favoriteCount: string;
    likeCount: string;
    viewCount: string;
  };
  snippet: ISnippetVideoDetail;
}

export interface IChannel {
  country: string;
  description: string;
  keywords: string;
  title: string;
  unsubscribedTrailer: string;
}
export interface IChannelDetail {
  brandingSettings: {
    channel: IChannel;
    image: { bannerExternalUrl: string };
  };
  contentDetails: {
    relatedPlaylists: { likes: string; uploads: string };
  };
  id: string;
  kind: string;
  snippet: {
    country: string;
    customUrl: string;
    description: string;
    localized: { title: string; description: string };
    publishedAt: string;
    thumbnails: {
      default: IDefault;
      high: IDefault;
      medium: IDefault;
    };
    title: string;
  };
  statistics: {
    viewCount: string;
    subscriberCount: string;
    hiddenSubscriberCount: boolean;
    videoCount: string;
  };
}
