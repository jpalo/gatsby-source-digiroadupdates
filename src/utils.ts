import { xml2json } from "xml-js";
import https from "https";

function get(url, resolve, reject) {
  https.get(url, (res) => {
    // if any other status codes are returned, those needed to be added here
    if (res.statusCode === 301 || res.statusCode === 302) {
      return get(res.headers.location, resolve, reject)
    }

    let body = [];

    res.on("data", (chunk) => {
      body.push(chunk);
    });

    res.on("end", () => {
      try {
        // remove JSON.parse(...) for plain data
        resolve(Buffer.concat(body).toString());
      } catch (err) {
        reject(err);
      }
    });
  });
}

async function getData(url): Promise<string> {
  return new Promise((resolve, reject) => get(url, resolve, reject));
}

export async function fetchXML(endpoint: string): Promise<string> {
  var retVal = '[]';

  try {
    // call
    var xml = await getData(endpoint);

    //convert to workable json
    retVal = xml2json(xml, { compact: true });

    // console.log(retVal.substring(0, 1000));
  }
  catch (error) {
    console.error('Error:', error);
  }

  return JSON.parse(retVal);
}
