export interface IGame {
  id: number;
  cover: ICover;
  first_release_date: number;
  name: string;
}

export interface IGameInfo {
  id: number;
  cover: ICover | undefined;
  first_release_date: number | undefined;
  genres: IGenre[] | undefined;
  name: string;
  screenshots: IScreenshot[] | undefined;
  summary: string;
  videos: IVideo[] | undefined;
}

export interface ICover {
  id: number;
  url: string;
}

export interface IGenre {
  id: number;
  name: string;
}

export interface IScreenshot {
  id: number;
  url: string;
}

export interface IVideo {
  id: number;
  video_id: string;
}
