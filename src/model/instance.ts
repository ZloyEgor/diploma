import { Wordform } from './wordform.ts';

export type Instance = {
  in: number;
  canonical: Wordform;
  instances: number[];
};
