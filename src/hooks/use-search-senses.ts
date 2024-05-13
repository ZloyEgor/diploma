import { useQuery } from '@tanstack/react-query';
import { senseService } from '../service/sense-service.ts';
import { Sense } from '../model/sense.ts';
import { referenceService } from '../service/reference-service.ts';
import { Reference } from '../model/reference.ts';
import { decodeSinId } from '../utils/decode-sin-id.ts';

export const useSearchSenses = (senseNames: (string | null | undefined)[]) => {
  const {
    data: senses,
    isError: isGetSensesError,
    isLoading: isSenseLoading,
  } = useQuery({
    queryKey: ['getSenses', senseNames],
    queryFn: () =>
      Promise.all(
        senseNames
          .filter((s) => s !== null && s !== undefined)
          .map((token) =>
            senseService.findSenseByText(String(token)).then((r) => r.data),
          ),
      ).then((data) => {
        return data.filter((d) => d !== null) as Sense[];
      }),
    retry: false,
  });

  const {
    data: references,
    isLoading: isReferencesLoading,
    isError: isGetReferencesError,
  } = useQuery({
    queryFn: () =>
      Promise.all(
        senses?.map((sense) =>
          referenceService.findReferencesBySource({ sourceId: sense!.id }),
        ) || [],
      ).then((data) => {
        const referenceArrays = data.filter(
          (data) => data !== null,
        ) as Reference[][];
        return referenceArrays.flat();
      }),
    queryKey: ['getReferences', senses],
    enabled: senses !== null && senses !== undefined && senses.length > 0,
  });

  const {
    data: neighbourSenses,
    isLoading: isNeighbourSensesLoading,
    isError: isGetNeighbourSensesError,
  } = useQuery({
    queryFn: () =>
      Promise.all(
        references!.map((r) =>
          senseService
            .findSenseById(decodeSinId(r.destination).senseId)
            .then((r) => r.data),
        ),
      ).then((r) => r.filter((s) => s !== null) as Sense[]),
    queryKey: ['getSenses', references],
    enabled: references !== null && references !== undefined,
  });

  const isLoading =
    isSenseLoading || isNeighbourSensesLoading || isReferencesLoading;
  const isError =
    isGetSensesError || isGetReferencesError || isGetNeighbourSensesError;

  return {
    isError,
    isLoading,
    senses,
    neighbourSenses,
    references,
  };
};
