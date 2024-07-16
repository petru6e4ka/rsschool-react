type Ability = {
  ability: {
    name: string;
  };
};

type Sprite = {
  front_default: string;
};

export interface Pockemon {
  name: string;
  id?: string;
  url?: string;
  height?: string;
  weight?: string;
  sprites?: Sprite;
  abilities?: Ability[];
}
