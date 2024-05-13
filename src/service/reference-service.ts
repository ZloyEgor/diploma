import { axiosClient } from '../utils/axios-clients.ts';
import { Reference, ReferenceType } from '../model/reference.ts';
import { SinId } from '../model/id.ts';

export const referenceService = {
  findReference: ({
    sourceId,
    destinationId,
    referenceType,
  }: {
    sourceId: SinId;
    destinationId: SinId;
    referenceType: ReferenceType;
  }) =>
    axiosClient.post<Reference | null>('find_reference', {
      src: sourceId,
      dst: destinationId,
      type: referenceType,
    }),

  findReferencesBySourceAndType: ({
    sourceId,
    referenceType,
  }: {
    sourceId: SinId;
    referenceType: ReferenceType;
  }) =>
    axiosClient.post<Reference[] | null>('find_references_source', {
      src: sourceId,
      type: referenceType,
    }),
  //
  // findReferencesBySource: ({ sourceId }: { sourceId: SinId }) =>
  //   Promise.all(
  //     (Object.keys(ReferenceType) as Array<keyof typeof ReferenceType>).map(
  //       (key) =>
  //         referenceService
  //           .findReferencesBySourceAndType({
  //             sourceId: sourceId,
  //             referenceType: ReferenceType[key],
  //           })
  //           .then((r) => r.data || []),
  //     ),
  //   ).then((res) => {
  //     return res.flat();
  //   }),

  findReferencesBySource: ({ sourceId }: { sourceId: SinId }) =>
    referenceService
      .findReferencesBySourceAndType({
        sourceId: sourceId,
        referenceType: ReferenceType.ALL,
      })
      .then((r) => r.data),

  findReferencesByDestinationAndType: ({
    destinationId,
    referenceType,
  }: {
    destinationId: SinId;
    referenceType: ReferenceType;
  }) =>
    axiosClient.post<Reference[] | null>('find_references_destination', {
      dst: destinationId,
      type: referenceType,
    }),
};
