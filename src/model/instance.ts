import { Wordform } from './wordform.ts';

export type Instance = {
  id: number;
  canonical: Wordform;
  instances: number[];
};
