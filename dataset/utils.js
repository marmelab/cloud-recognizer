const { basename } = require('path');

const uuid = require('uuid/v4');
const fs = require('fs');
const http = require('http');
const https = require('https');

const { typeFolder } = require('./cloud-types');

const get = (file, cb) => {
    if (file.indexOf('https') === 0) {
        return https.get(file, cb);
    }

    return http.get(file, cb);
}

const formatTime = Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
}).format;

const download = async (file, type) => {
    console.log(`[${formatTime(new Date())}] Downloading ${file}...`);

    const fd = fs.createWriteStream(`${typeFolder(type)}/${basename(file)}`);

    return new Promise((resolve, reject) => {
        get(file, (response) => {
            response.pipe(fd);
            fd.on('finish', function() {
                fd.close(resolve);
            });
        });
    });
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

module.exports = {
    delay,
    download,
};
