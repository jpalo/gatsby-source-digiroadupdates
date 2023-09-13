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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchXML = void 0;
const xml_js_1 = require("xml-js");
const https_1 = __importDefault(require("https"));
function get(url, resolve, reject) {
    https_1.default.get(url, (res) => {
        // if any other status codes are returned, those needed to be added here
        if (res.statusCode === 301 || res.statusCode === 302) {
            return get(res.headers.location, resolve, reject);
        }
        let body = [];
        res.on("data", (chunk) => {
            body.push(chunk);
        });
        res.on("end", () => {
            try {
                // remove JSON.parse(...) for plain data
                resolve(Buffer.concat(body).toString());
            }
            catch (err) {
                reject(err);
            }
        });
    });
}
function getData(url) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => get(url, resolve, reject));
    });
}
function fetchXML(endpoint) {
    return __awaiter(this, void 0, void 0, function* () {
        var retVal = '[]';
        try {
            // call
            var xml = yield getData(endpoint);
            //convert to workable json
            retVal = (0, xml_js_1.xml2json)(xml, { compact: true });
            // console.log(retVal.substring(0, 1000));
        }
        catch (error) {
            console.error('Error:', error);
        }
        return JSON.parse(retVal);
    });
}
exports.fetchXML = fetchXML;
