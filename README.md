# Cloud Recognizer

## Installation

To install project dependencies, simply run:

```sh
make install
```

Then, update your FlickR credentials to be able to grab training data from FlickR API:

```sh
cp dataset/config.dist.js dataset/config.js
vi dataset/config.js
```

## Training Data

```sh
make grab-tranining-data
```
