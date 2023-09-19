import type { GatsbyNode, SourceNodesArgs, NodeInput } from "gatsby"
import { fetchXML } from "./utils";
import type { NodeBuilderInput } from "./types"
import { NODE_TYPES } from "./constants"
import { koordGT } from './utm'

export const sourceNodes: GatsbyNode[`sourceNodes`] = async (gatsbyApi) => {
    var query = "https://avoinapi.vaylapilvi.fi/tnits/public/download/queryDataSets";

    var parentItems = await fetchXML(query);

    for (const item of parentItems['RestDatasetRefList']['RestDatasetRef']) {
        var url = item['_attributes']['xlink:href'];

        var rfs = await fetchXML(url);
        console.log(url);

        if (!Array.isArray(rfs['RoadFeatureDataset']['roadFeatures'])) {
            continue;
        }

        for (var rf of rfs['RoadFeatureDataset']['roadFeatures']) {
            // console.log(JSON.stringify(rf));

            rf = rf['RoadFeature'];

            if (rf['properties'] == undefined || rf['properties']['GenericRoadFeatureProperty'] == undefined) {
                // console.warn('No properties found for rf: ' + rf['id']['RoadFeatureId']['id']['_text']);
                continue;
            }

            let rfType = rf['properties']['GenericRoadFeatureProperty']['type']['_attributes']['xlink:title'];

            if (rfType == 'maximumSpeedLimit') {

                let locationTempArray = rf['locationReference'][1]['GeometryLocationReference']['encodedGeometry']['gml:LineString']['gml:posList']['_text'].split(' ');
                let locationArray_utm: string[] = [];
                let locationArray_deg: string[] = [];
                let lat: number;
                let lng: number;

                for (var i = 0; i < locationTempArray.length; i++) {
                    if (i % 2 == 0) {                        
                        lng = parseFloat(locationTempArray[i]);
                    } else {                        
                        lat = parseFloat(locationTempArray[i]);

                        // if(lat == 60.40718439269159) console.log(lat + ', ' + lng)
                        // convert to lat/long                        
                        let l = koordGT(lat, lng);

                        // if(lat == 60.40718439269159) console.log(JSON.stringify(l))

                        locationArray_deg.push(lat + '/' + lng);
                        locationArray_utm.push(l['E'] + '/' + l['N']);
                    }
                }

                nodeBuilder({
                    gatsbyApi, input: {
                        type: NODE_TYPES.RoadFeature,
                        data: {
                            id: rf['id']['RoadFeatureId']['id']['_text'],
                            validFrom: new Date(rf['validFrom']['_text']),
                            updateType: rf['updateInfo']['UpdateInfo']['type']['_text'],
                            // roadFeatureType: rfType,
                            value: rf['properties']['GenericRoadFeatureProperty']['value']['_text'],
                            location_utm: locationArray_utm,
                            location_deg: locationArray_deg
                        }
                    }
                });
            }
        }

        // break;
    }
}

interface INodeBuilderArgs {
    gatsbyApi: SourceNodesArgs
    input: NodeBuilderInput
}

export function nodeBuilder({ gatsbyApi, input }: INodeBuilderArgs) {
    const id = gatsbyApi.createNodeId(`${input.type}-${input.data.id}`)

    const node = {
        ...input.data,
        id,
        _id: input.data.id,
        parent: null,
        children: [],
        internal: {
            type: input.type,
            contentDigest: input.data.id.toString(),
        },
    } satisfies NodeInput

    // console.log('creating node: ' + JSON.stringify(node))

    gatsbyApi.actions.createNode(node)

}
