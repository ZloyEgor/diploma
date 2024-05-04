import { Wordform } from './wordform.ts';

export type Sense = {
  id: number;
  canonical: Wordform;
  named_id: string;
  wordforms: Wordform[];
};
