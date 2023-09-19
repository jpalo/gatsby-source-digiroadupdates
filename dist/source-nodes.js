"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeBuilder = exports.sourceNodes = void 0;
const utils_1 = require("./utils");
const constants_1 = require("./constants");
const utm_1 = require("./utm");
const sourceNodes = (gatsbyApi) => __awaiter(void 0, void 0, void 0, function* () {
    var query = "https://avoinapi.vaylapilvi.fi/tnits/public/download/queryDataSets";
    var parentItems = yield (0, utils_1.fetchXML)(query);
    for (const item of parentItems['RestDatasetRefList']['RestDatasetRef']) {
        var url = item['_attributes']['xlink:href'];
        var rfs = yield (0, utils_1.fetchXML)(url);
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
                let locationArray_utm = [];
                let locationArray_deg = [];
                let lat;
                let lng;
                for (var i = 0; i < locationTempArray.length; i++) {
                    if (i % 2 == 0) {
                        lng = parseFloat(locationTempArray[i]);
                    }
                    else {
                        lat = parseFloat(locationTempArray[i]);
                        // if(lat == 60.40718439269159) console.log(lat + ', ' + lng)
                        // convert to lat/long                        
                        let l = (0, utm_1.koordGT)(lat, lng);
                        // if(lat == 60.40718439269159) console.log(JSON.stringify(l))
                        locationArray_deg.push(lat + '/' + lng);
                        locationArray_utm.push(l['E'] + '/' + l['N']);
                    }
                }
                nodeBuilder({
                    gatsbyApi, input: {
                        type: constants_1.NODE_TYPES.RoadFeature,
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
});
exports.sourceNodes = sourceNodes;
function nodeBuilder({ gatsbyApi, input }) {
    const id = gatsbyApi.createNodeId(`${input.type}-${input.data.id}`);
    const node = Object.assign(Object.assign({}, input.data), { id, _id: input.data.id, parent: null, children: [], internal: {
            type: input.type,
            contentDigest: input.data.id.toString(),
        } });
    // console.log('creating node: ' + JSON.stringify(node))
    gatsbyApi.actions.createNode(node);
}
exports.nodeBuilder = nodeBuilder;
