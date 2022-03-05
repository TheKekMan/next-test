export interface IGame {
  id: number;
  cover: ICover;
  first_release_date: number;
  name: string;
}

export interface IGameInfo {
  id: number;
  cover: ICover;
  first_release_date: number;
  genres: IGenre[];
  name: string;
  screenshots: IScreenshot[];
  summary: string;
  videos: IVideo[];
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
