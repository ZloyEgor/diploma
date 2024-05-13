import { FC } from 'react';
import { Spin } from 'antd';
import { CenterWrapper } from '../../utils/center-wrapper';

export type LoadingSpinnerProps = {
  showLabel?: boolean;
  label?: string;
};

export const LoadingSpinner: FC<LoadingSpinnerProps> & {
  Centered: FC<LoadingSpinnerProps>;
} = ({ showLabel = true, label = 'Загрузка...' }) => (
  <Spin tip={showLabel ? label : undefined}></Spin>
);

const CenteredLoadingSpinner: FC<LoadingSpinnerProps> = (props) => (
  <CenterWrapper>
    <LoadingSpinner {...props} />
  </CenterWrapper>
);

LoadingSpinner.Centered = CenteredLoadingSpinner;
