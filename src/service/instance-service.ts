import { axiosClient } from '../utils/axios-clients.ts';
import { Instance } from '../model/instance.ts';

export const instanceService = {
  findInstanceById: (id: string) =>
    axiosClient.post<Instance | null>('find_instance', { id }),

  findInstanceByIdAndCanonical: ({
    id,
    canonical,
  }: {
    id: number;
    canonical: string;
  }) => axiosClient.post<Instance | null>('find_instance', { id, canonical }),

  findInstanceByIdAndCanonicalId: ({
    id,
    canonicalId,
  }: {
    id: number;
    canonicalId: number;
  }) =>
    axiosClient.post<Instance | null>('find_instance', {
      id,
      canonical_id: canonicalId,
    }),

  findInstancesBySenseNumber: (senseId: number) =>
    axiosClient.post<Instance[] | null>('find_instances', {
      sense_no: senseId,
    }),

  findInstancesBySenseNumberAndValue: ({
    id,
    value,
  }: {
    id: number;
    value: string;
  }) =>
    axiosClient.post<Instance[] | null>('find_instances', {
      sense_no: id,
      value,
    }),
};
