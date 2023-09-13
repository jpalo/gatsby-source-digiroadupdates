import type { PluginOptions as GatsbyDefaultPluginOptions, IPluginRefOptions } from "gatsby";
import { NODE_TYPES } from "./constants";
export type NodeBuilderInput = {
    type: typeof NODE_TYPES.RoadFeature;
    data: IRoadFeatureInput;
};
export interface IRoadFeatureInput {
    id: string;
    validFrom: string;
    updateType: string;
    roadFeatureType: string;
    value: number;
    location_utm: string[];
    location_deg: string[];
}
interface IPluginOptionsKeys {
    [key: string]: any;
}
/**
 * Gatsby expects the plugin options to be of type "PluginOptions" for gatsby-node APIs (e.g. sourceNodes)
 */
export interface IPluginOptionsInternal extends IPluginOptionsKeys, GatsbyDefaultPluginOptions {
}
/**
 * These are the public TypeScript types for consumption in gatsby-config
 */
export interface IPluginOptions extends IPluginOptionsKeys, IPluginRefOptions {
}
export {};
