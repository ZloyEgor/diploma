import { Props } from '../../utils/props.ts';
import { Network, Options } from 'vis';
import React, { HTMLProps, useMemo } from 'react';
import Graph, { GraphData, GraphEvents } from 'react-graph-vis';
import { component } from '../../utils/component.tsx';
import { generateEdges, generateNodes } from '../../utils/generate.ts';
import style from './example.module.scss';
import clsx from 'clsx';

type GraphExampleProps = Props<
  {
    getNetwork?: (network: Network) => void;
  },
  false,
  HTMLProps<HTMLDivElement>
>;

const graph: GraphData = {
  nodes: [
    {
      id: 1,
      label: 'Node 1',
      title: 'node 1 tootip text',
      shape: 'circle',
    },
    {
      id: 2,
      label: 'Node 2',
      title: 'node 2 tootip text',
      shape: 'database',
    },
    {
      id: 3,
      label: 'Node 3',
      title: 'node 3 tootip text',
      shape: 'square',
    },
    { id: 4, label: 'Node 4', title: 'node 4 tootip text' },
    { id: 5, label: 'Node 5', title: 'node 5 tootip text' },
  ],
  edges: [
    { from: 1, to: 2, dashes: true, title: 'Oxi' },
    { from: 1, to: 3 },
    { from: 2, to: 4 },
    { from: 2, to: 5 },
  ],
};

const options: Options = {
  layout: {
    hierarchical: false,
    improvedLayout: false,
  },
  edges: {
    color: '#000000',
  },
  locale: 'ru',
  autoResize: true,
  // width: '100%',
  // height: '100%',
};

export const GraphExample = component<GraphExampleProps>(
  ({ getNetwork, className, ...rest }) => {
    const events: GraphEvents = {
      click: ({ event }) => {},
    };

    const generatedGraph = useMemo(
      () => ({
        nodes: generateNodes(1000),
        edges: generateEdges({ edgeAmount: 500, nodeAmount: 1000 }),
      }),
      [],
    );

    return (
      <div className={clsx(style.container, className)} {...rest}>
        <Graph
          graph={graph}
          // graph={generatedGraph}
          options={options}
          events={events}
          getNetwork={(network) => {
            //  if you want access to vis.js network api you can set the state in a parent component using this property
            getNetwork?.(network);
          }}
        />
      </div>
    );
  },
);
