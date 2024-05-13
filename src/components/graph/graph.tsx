import { FC } from 'react';
import NetworkGraph, { NetworkGraphProps } from 'react-graph-vis';
import { Options } from 'vis';

const defaultOptions: Options = {
  locale: 'ru',
  autoResize: true,
  width: '100%',
  height: '100%',
};
export const Graph: FC<NetworkGraphProps> = ({
  options = defaultOptions,
  ...rest
}) => {
  return <NetworkGraph options={options} {...rest} />;
};
