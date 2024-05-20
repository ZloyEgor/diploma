import { FC, useMemo } from 'react';
import style from './search-sense-page.module.scss';
import { ArrayParam, useQueryParam, withDefault } from 'use-query-params';
import { convertSensesAndReferencesToGraphData } from '../../utils/convert.ts';
import { LoadingSpinner } from '../../components/loading-spinner/loading-spinner.tsx';
import { Select } from 'antd';
import { useSearchSenses } from '../../hooks/use-search-senses.ts';
import { CenterWrapper } from '../../utils/center-wrapper';
import { LabeledInput } from '../../components/util/labeled-input';
import { Graph } from '../../components/graph/graph.tsx';

export const SearchSensePage: FC = () => {
  const [searchTokens, setSearchTokens] = useQueryParam(
    'sense',
    withDefault(ArrayParam, []),
  );

  const isSearchValueEmpty = searchTokens.length === 0;

  const { senses, neighbourSenses, references, isLoading, isError } =
    useSearchSenses(searchTokens);

  const graphData = useMemo(() => {
    if (senses && neighbourSenses && references) {
      return convertSensesAndReferencesToGraphData(
        [...senses, ...neighbourSenses],
        references,
      );
    }
  }, [senses, neighbourSenses, references]);

  const renderFeedbackMessage = () => {
    if (isSearchValueEmpty) {
      return (
        <CenterWrapper>
          <>Введите запрос</>
        </CenterWrapper>
      );
    }
    if (isLoading) {
      return <LoadingSpinner.Centered />;
    }
    if (isError) {
      return (
        <CenterWrapper>
          <>Во время загрузки данных произошла ошибка</>
        </CenterWrapper>
      );
    }
    if (!isLoading && !isError && !graphData) {
      return (
        <CenterWrapper>
          <>Данные отсутствуют</>
        </CenterWrapper>
      );
    }
  };

  return (
    <div className={style.searchSensePage}>
      {renderFeedbackMessage()}
      {!isLoading && !isError && graphData && <Graph graph={graphData} />}
      <div className={style.searchSensePageProps}>
        <LabeledInput
          label="Поиск по понятиям:"
          InputComponent={Select}
          mode="tags"
          labelInValue
          allowClear
          style={{ width: '100%' }}
          onChange={(selected) => {
            // @ts-ignore
            const tokens = selected.map((v) => v.value);
            setSearchTokens(tokens, 'push');
          }}
          defaultValue={searchTokens}
          notFoundContent={null}
          placeholder={'Начните вводить здесь...'}
          options={[]}
        />
      </div>
    </div>
  );
};
