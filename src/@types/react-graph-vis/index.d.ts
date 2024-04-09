declare module 'react-graph-vis' {
    import {
        Network,
        NetworkEvents,
        Options,
        Node,
        Edge,
        DataSet,
        IdType,
        PointItem,
    } from 'vis';
    import React, { Component } from 'react';

    export {
        Network,
        NetworkEvents,
        Options,
        Node,
        Edge,
        DataSet,
        PointItem,
    } from 'vis';

    export type EventArguments = {
        nodes: IdType;
        edges: IdType;
        event: MouseEvent;
        pointer: { DOM: PointItem; canvas: PointItem };
    };

    export type ClickEventArguments = EventArguments & {
        items:
            | { nodeId: IdType }
            | { nodeId: IdType; labelId: IdType }
            | { edgeId: IdType }
            | { edgeId: IdType; labelId: IdType };
    };

    export type GraphEvents = {
        [K in Exclude<NetworkEvents, 'click'>]?: (
            params: EventArguments,
        ) => void;
    } & {
        click?: (params: ClickEventArguments) => void;
    };
    // export type GraphEvents = {
    //     [K in Exclude<NetworkEvents, 'click'>]: (
    //         params: EventArguments,
    //     ) => void;
    // };

    //Doesn't appear that this module supports passing in a vis.DataSet directly. Once it does graph can just use the Data object from vis.
    export interface GraphData {
        nodes: Node[];
        edges: Edge[];
    }

    export interface NetworkGraphProps {
        graph: GraphData;
        options?: Options;
        events?: GraphEvents;
        getNetwork?: (network: Network) => void;
        identifier?: string;
        style?: React.CSSProperties;
        getNodes?: (nodes: DataSet) => void;
        getEdges?: (edges: DataSet) => void;
    }

    export interface NetworkGraphState {
        identifier: string;
    }

    export default class NetworkGraph extends Component<
        NetworkGraphProps,
        NetworkGraphState
    > {
        render();
    }
}
