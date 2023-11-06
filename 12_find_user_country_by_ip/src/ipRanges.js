import fs from 'fs';


loadIPRanges()


function loadIPRanges() {
    const lines= fs.readFileSync('IP2LOCATION-LITE-DB1.CSV', 'utf8').split('\n');
    const ipRanges = new Array(lines.length);
    for (let x = 0; x < lines.length; x++) {
        if (lines[x].length > 0) {
            let parts = lines[x].split(',');
            ipRanges[x] = {
                start: parts[0].trim().slice(1, -1),
                end: parts[1].trim().slice(1, -1),
                countryCode: parts[2].trim().slice(1, -1),
                countryName: parts[3].trim().slice(1, -1)
            }
        }
    }
    global.ipRanges = ipRanges;
}


export function getIpData(ip) {
    const ipInt = convertIpToNumber(ip);
    const ipRanges = global.ipRanges;
    for (let x = 0; x < ipRanges.length; x++) {
        if (ipInt >= convertIpToNumber(ipRanges[x].start) && ipInt <= convertIpToNumber(global.ipRanges[x].end)) {
            return {
                ip: ip,
                ipRangeStart: convertNumberToIp(ipRanges[x].start),
                ipRangeEnd: convertNumberToIp(ipRanges[x].end),
                countryCode: ipRanges[x].countryCode,
                countryName: ipRanges[x].countryName
            }
        }
    }

    throw new Error('Impossible IP address');
}

function convertIpToNumber(ip) {
    return ip.split('.').reduce(function(ipInt, octet) { return (ipInt<<8) + parseInt(octet, 10)}, 0) >>> 0;
}

function convertNumberToIp(ipInt) {
    return ( (ipInt>>>24) +'.' + (ipInt>>16 & 255) +'.' + (ipInt>>8 & 255) +'.' + (ipInt & 255) );
}
