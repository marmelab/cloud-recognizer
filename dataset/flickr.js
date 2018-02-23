const Flickr = require('flickrapi');
const fs = require('fs');

const { API_KEY, API_SECRET, USER_ID, ACCESS_TOKEN, ACCESS_TOKEN_SECRET } = require('./config');
const { types } = require('./cloud-types');
const { delay, download } = require('./utils');

const getPage = async (type, page = 1, flickr) => new Promise((resolve, reject) =>
    flickr.photos.search({
        tags: type,
        page,
        limit: 5,
        order: 'date-posted-asc'
    }, (err, result) => {
        if (err) {
            return reject(err);
        }

        return resolve(result);
    })
);

const getNumberPages = async (type, flickr) => {
    const page = await getPage(type, 1, flickr);
    return page.photos.pages;
};

const getPhotoUrl = async (id, flickr) => new Promise((resolve, reject) => {
    flickr.photos.getSizes({ photo_id: id }, (err, result) => {
        if (err) {
            return reject(err);
        }

        const sizes = result.sizes.size;
        const bestSize = sizes.find(s => s.label === 'Large' || s.label === 'Original' || s.label === 'Medium') || sizes[0];
        const largeUrl = bestSize.source;

        return resolve(largeUrl);
    });
});

const downloadPage = async (type, page, flickr) => {
    const { photos: { photo: photos } } = await getPage(type, page, flickr);

    for (const photo of photos) {
        const photoUrl = await getPhotoUrl(photo.id, flickr);
        await delay(1001); // rate limiting is 3600 requests per hour, so 1 per second. Let's move below the limit.
        await download(photoUrl, type);
    }
};


const downloadTypeFactory = flickr => async type => {
    const numberPages = await getNumberPages(type, flickr);

    const pages = [...Array(numberPages + 1).keys()].slice(1);
    for (const page of pages) {
        console.log(`==> Downloading ${type} clouds (page ${page})`);
        await downloadPage(type, page, flickr);
    }
};

const getFlickrClient = async () => new Promise((resolve, reject) => Flickr.authenticate({
    api_key: API_KEY,
    secret: API_SECRET,
    user_id: USER_ID,
    access_token: ACCESS_TOKEN,
    access_token_secret: ACCESS_TOKEN_SECRET,
}, (err, flickr) => {
    if (err) {
        return reject(err);
    }

    return resolve(flickr);
}));

const scrap = async () => {
    const flickr = await getFlickrClient();
    const downloadType = downloadTypeFactory(flickr);

    for (const type of types) {
        await downloadType(type);
    }

    process.exit(0);
};

scrap();
