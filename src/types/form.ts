export enum Gender {
  Male,
  Female,
}

export enum Countries {
  USA,
  UK,
  France,
  Germany,
  Canada,
}

export enum Forms {
  authinfo = 'auth_info',
  generalinfo = 'general_info',
  additionalinfo = 'additional_info',
}

export type User = {
  name: string;
  age: number;
  gender: Gender;
  country: Countries;
  email: string;
  password: string;
  passwordRepeat: string;
  terms: boolean;
  avatar: string;
};
