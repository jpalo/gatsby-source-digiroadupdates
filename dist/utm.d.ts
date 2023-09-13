declare function toUtm(latitude: any, longitude: any, precision: any, ellipsoidName: any): {
    easting: number;
    northing: number;
    zoneNumber: any;
    zoneLetter: string;
};
declare function fromUtm(easting: any, northing: any, zoneNumber: any, zoneLetter: any, ellipsoidName: any): {
    latitude: number;
    longitude: number;
};
export { fromUtm, toUtm };
