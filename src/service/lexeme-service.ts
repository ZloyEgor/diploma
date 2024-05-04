import { axiosClient } from '../utils/axios-clients.ts';
import { Lexeme } from '../model/lexeme.ts';

export const lexemeService = {
  findLexemeByText: (text: string) =>
    axiosClient.post<Lexeme | null>('/find_lexeme', { value: text }),

  findLexemeById: (id: number) =>
    axiosClient.post<Lexeme | null>('/find_lexeme', { leid: id }),
};
