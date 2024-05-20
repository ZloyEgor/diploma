import { FC } from 'react';
import NetworkGraph, { NetworkGraphProps } from 'react-graph-vis';
import { Options } from 'vis';

const defaultOptions: Options = {
  edges: {
    length: 200,
  },
  locale: 'ru',
  autoResize: true,
  width: '100%',
  height: '100%',
  physics: {
    enabled: true,
    hierarchicalRepulsion: {
      centralGravity: 0.0,
      springConstant: 0.01,
    },
    solver: 'hierarchicalRepulsion',
  },
};
export const Graph: FC<NetworkGraphProps> = ({
  options = defaultOptions,
  ...rest
}) => {
  return <NetworkGraph options={options} {...rest} />;
};
