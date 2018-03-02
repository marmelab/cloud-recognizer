install:
	npm install

grab-tranining-data:
	mkdir -p \
		images/cirrus \
		images/cirrostratus \
		images/cirrocumulus \
		images/altocumulus \
		images/altostratus \
		images/stratocumulus \
		images/stratus \
		images/nimbostratus \
		images/cumulus \
		images/cumulonimbus

	node ./dataset/flickr.js
