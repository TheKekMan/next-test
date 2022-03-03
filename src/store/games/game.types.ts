export interface ICover {
  id: number;
  url: string;
}

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
  name: string;
}
