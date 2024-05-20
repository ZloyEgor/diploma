import { Sense } from '../model/sense.ts';
import { Reference } from '../model/reference.ts';
import { GraphData } from 'react-graph-vis';
import { decodeSinId } from './decode-sin-id.ts';
import ellipsis from 'text-ellipsis';

// const referenceTypeToArrow: { [key in ReferenceType]: ArrowHead } = {};

const removeSenseDuplicates = (senses: Sense[]): Sense[] => {
  const senseMap = new Map<number, Sense>();
  senses.forEach((sense) => {
    senseMap.set(sense.id, sense);
  });
  return Array.from(senseMap, ([, sense]) => sense);
};

const removeReferenceDublicates = (references: Reference[]): Reference[] => {
  const referenceMap = new Map<string, Reference>();
  references.forEach((reference) => {
    const fromId = decodeSinId(reference.source).senseId;
    const toId = decodeSinId(reference.destination).senseId;
    const uniqueId = `${Math.min(fromId, toId)}-${Math.max(fromId, toId)}`;
    referenceMap.set(uniqueId, reference);
  });
  return Array.from(referenceMap, ([, reference]) => reference);
};

const renderTooltipData = (sense: Sense) => {
  const wordforms = sense?.wordforms.map((w) => w.lexeme);
  return `${sense.named_id}
  Словоформы:
  ${wordforms.join(',\n')}`;
};

export const convertSensesAndReferencesToGraphData = (
  senses: Sense[],
  references: Reference[],
): GraphData => {
  const sensesWithoutDuplicates = removeSenseDuplicates(senses);
  const referencesWithoutDuplicates = removeReferenceDublicates(references);

  return {
    nodes: sensesWithoutDuplicates.map((s) => ({
      id: s.id,
      label: ellipsis(s.named_id, 15),
      title: renderTooltipData(s),
    })),
    edges: referencesWithoutDuplicates.map((r) => {
      const from = r.source;
      const to = r.destination;
      return {
        id: `${from}-${to}`,
        from,
        to,
        label: r.type,
        // arrows: {
        //   to: {
        //     type: 'image',
        //     src: rhombus,
        //     imageHeight: 20,
        //     imageWidth: 12,
        //   },
        // },
      };
    }),
  };
};
