import { Edge, Node } from 'vis';

export const generateNodes = (amount: number = 1000) =>
  Array.from<unknown, Node>({ length: amount }, (_, i) => ({
    id: i,
    label: `Node ${i + 1}`,
  }));

export const generateEdges = ({
  edgeAmount = 250,
  nodeAmount = 1000,
}: {
  edgeAmount?: number;
  nodeAmount?: number;
} = {}) =>
  Array.from<unknown, Edge>({ length: edgeAmount }, (_, i) => ({
    from: Math.floor(Math.random() * nodeAmount),
    to: Math.floor(i),
  }));
