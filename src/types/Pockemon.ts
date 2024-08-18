type Ability = {
  ability: {
    name: string;
  };
};

type Sprite = {
  front_default: string;
};

export type Pockemon = {
  name: string;
  id?: number;
  url?: string;
  height?: string;
  weight?: string;
  sprites?: Sprite;
  abilities?: Ability[];
};
