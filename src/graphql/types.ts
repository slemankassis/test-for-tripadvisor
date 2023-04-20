export interface Character {
  id: string;
  name: string;
  image: string;
}

interface PageInfo {
  count: number;
  pages: number;
  next: string;
  prev: string;
}

export interface GetCharactersData {
  characters: {
    info: PageInfo;
    results: Character[];
  };
}

interface Dimension {
  name: string;
  type: string;
  dimension: string;
}

export interface GetCharacterData {
  id: string;
  name: string;
  status: string;
  species: string;
  type: string | null;
  gender: string;
  origin: Dimension;
  location: Dimension;
  image: string;
}