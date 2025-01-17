export enum ReferenceType {
  PROPERTY = 'PROPERTY',
  ANTONYM = 'ANTONYM',
  SYNONYM = 'SYNONYM',
  HYPONYM = 'HYPONYM', //наследование
  HYPERNYM = 'HYPERNYM',
  MERONYM = 'MERONYM', //part-of
  HOLONYM = 'HOLONYM',
  ALL = 'ALL',
}

export type Reference = {
  source: number;
  destination: number;
  type: ReferenceType;
};
