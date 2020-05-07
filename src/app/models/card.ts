export interface CardResponse {
  cards: Card[];
  _links: Links;
  _pageSize: number;
  _totalCount: number;
}

export interface Card {
  name: string;
  rarity: string;
  type: string;
  cost: number;
  power?: number;
  health?: number;
  set: Set;
  collectible: boolean;
  text: string;
  attributes: string[];
  unique: boolean;
  imageUrl: string;
  id: string;
}

export interface Set {
  id: string;
  name: string;
  _self: string;
}

export interface Links {
  next: string;
}
