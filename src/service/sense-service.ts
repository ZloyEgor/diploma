import { axiosClient } from '../utils/axios-clients.ts';
import { Sense } from '../model/sense.ts';

export const senseService = {
  findSenseByText: (text: string) =>
    axiosClient.post<Sense | null>('/find_sense', { value: text }),
  findSenseById: (id: number) =>
    axiosClient.post<Sense | null>('/find_sense', { sense_no: id }),
  findSenseByWordForm: (value: string) =>
    axiosClient.post<Sense[] | null>('/find_senses_by_wordform', {
      value,
    }),
};
