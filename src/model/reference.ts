export enum ReferenceType {
  PROPERTY = 'PROPERTY',
  ANTONYM = 'ANTONYM',
  SYNONYM = 'SYNONYM',
  HYPONYM = 'HYPONYM',
  HYPERNYM = 'HYPERNYM',
  MERONYM = 'MERONYM',
  HOLONYM = 'HOLONYM',
}

export type Reference = {
  source: number;
  destination: number;
  type: ReferenceType;
};
