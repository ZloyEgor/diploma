import { axiosClient } from '../utils/axios-clients.ts';
import { Reference, ReferenceType } from '../model/reference.ts';

export const referenceService = {
  findReference: ({
    sourceId,
    destinationId,
    referenceType,
  }: {
    sourceId: number;
    destinationId: number;
    referenceType: ReferenceType;
  }) =>
    axiosClient.post<Reference | null>('find_reference', {
      src: sourceId,
      dst: destinationId,
      type: referenceType,
    }),

  findReferencesSource: ({
    sourceId,
    referenceType,
  }: {
    sourceId: number;
    referenceType: ReferenceType;
  }) =>
    axiosClient.post<Reference[]>('find_references_source', {
      src: sourceId,
      type: referenceType,
    }),

  findReferencesDestination: ({
    destinationId,
    referenceType,
  }: {
    destinationId: number;
    referenceType: ReferenceType;
  }) =>
    axiosClient.post<Reference[]>('find_references_destination', {
      dst: destinationId,
      type: referenceType,
    }),
};
