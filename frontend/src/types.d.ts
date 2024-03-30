import { ChangeEvent } from 'react';

export interface UserData {
  _id: string;
  displayName: string;
}

export interface IngredientData {
  title: string;
  quantity: string;
}

export interface IngredientInputData {
  titleId: number;
  quantityId: number;
  titleName: string;
  quantityName: string;
  titleValue: string;
  quantityValue: string;
  titleOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
  quantityOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
  addOne: () => void;
  deleteOne: (nameId: number) => void;
}

export interface RatingData {
  userId: string;
  rating: string;
}

export interface RatingDataMutation extends RatingData {
  cocktailId: string;
}
export interface CocktailReduced {
  _id: string;
  title: string;
  userId: UserData;
  isPublished: boolean;
  image: string;
  ratings: RatingData[];
}

export interface CocktailMutation {
  title: string;
  recipe: string;
  image: File | null;
  ingredients: string;
}
export interface CocktailInputData {
  title: string;
  recipe: string;
  image: File | null;
}

export interface CombinedData {
  mainState: CocktailInputData;
  ingredients: string;
}

export interface CocktailExtended extends CocktailReduced {
  ingredients: IngredientData[];
  recipe: string;
}

export interface CocktailsResponse {
  [key: string]: string;
  cocktails: CocktailReduced[];
}

export interface RegisterMutation {
  email: string;
  password: string;
  displayName: string;
  avatar: File | null;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  email: string;
  token: string;
  role: string;
  displayName: string;
  avatar?: string;
  googleID?: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface GlobalError {
  error: string;
}
export interface RegisterResponse {
  message: string;
  user: User;
}
