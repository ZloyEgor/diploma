import { axiosClient } from '../utils/axios-clients.ts';
import { Wordform } from '../model/wordform.ts';

export const wordformService = {
  findWordformById: (id: number) =>
    axiosClient.post<Wordform | null>('find_wordform', { wfid: id }),
  findWordformsByLexemId: (lexemId: number) =>
    axiosClient.post<Wordform[]>('find_wordforms', { leid: lexemId }),
};
