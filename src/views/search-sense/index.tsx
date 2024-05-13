import { FC, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { senseService } from '../../service/sense-service.ts';
import { referenceService } from '../../service/reference-service.ts';
import { decodeSinId } from '../../utils/decode-sin-id.ts';
import Graph from 'react-graph-vis';
import { Sense } from '../../model/sense.ts';
import { Options } from 'vis';
import style from './search.module.scss';
import { Select } from 'antd';
import { ArrayParam, useQueryParam, withDefault } from 'use-query-params';
import { Reference } from '../../model/reference.ts';
import { convertSensesAndReferencesToGraphData } from '../../utils/convert.ts';
import { LoadingSpinner } from '../../components/loading-spinner/loading-spinner.tsx';
import { CenterWrapper } from '../../utils/center-wrapper';

const options: Options = {
  edges: {
    color: '#000000',
  },
  locale: 'ru',
  autoResize: true,
  width: '100%',
  height: '100%',
};

export const SearchView: FC = () => {
  const [searchTokens, setSearchTokens] = useQueryParam(
    'sense',
    withDefault(ArrayParam, []),
  );

  const {
    data: senses,
    isError: isGetSensesError,
    isLoading: isSenseLoading,
  } = useQuery({
    queryKey: ['getSenses', searchTokens],
    queryFn: () =>
      Promise.all(
        searchTokens
          .filter((t) => t !== null)
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

  const graphData = useMemo(() => {
    if (senses && neighbourSenses && references) {
      return convertSensesAndReferencesToGraphData(
        [...senses, ...neighbourSenses],
        references,
      );
    }
  }, [senses, neighbourSenses, references]);

  const isLoading =
    isSenseLoading || isNeighbourSensesLoading || isReferencesLoading;
  const isError =
    isGetSensesError || isGetReferencesError || isGetNeighbourSensesError;
  const isSearchValueEmpty = searchTokens.length === 0;

  return (
    <div className={style.search}>
      <Select
        mode="tags"
        labelInValue
        allowClear
        style={{ width: '100%' }}
        onChange={(selected) => {
          const tokens = selected.map((v) => v.value);
          setSearchTokens(tokens, 'push');
        }}
        defaultValue={searchTokens}
      />
      {isSearchValueEmpty && <p>Введите запрос</p>}
      {isLoading && <LoadingSpinner.Centered />}
      {isError && (
        <CenterWrapper>
          <>Во время загрузки данных произошла ошибка</>
        </CenterWrapper>
      )}
      {!isLoading && !isError && graphData && (
        <Graph options={options} graph={graphData} />
      )}
    </div>
  );
};
