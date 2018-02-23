const path = require('path');

const CIRRUS = 'cirrus';
const CIRROSTRATUS = 'cirrostratus';
const CIRROCUMULUS = 'cirrocumulus';
const ALTOCUMULUS = 'altocumulus';
const ALTOSTRATUS = 'altostratus';
const STRATOCUMULUS = 'stratocumulus';
const STRATUS = 'stratus';
const NIMBOSTRATUS = 'nimbostratus';
const CUMULUS = 'cumulus';
const CUMULONIMBUS = 'cumulonimbus';

const types = [
    CIRRUS,
    CIRROSTRATUS,
    CIRROCUMULUS,
    ALTOCUMULUS,
    ALTOSTRATUS,
    STRATOCUMULUS,
    STRATUS,
    NIMBOSTRATUS,
    CUMULUS,
    CUMULONIMBUS,
];

const folders = {
    [CIRRUS]: 'cirrus',
    [CIRROSTRATUS]: 'cirrostratus',
    [CIRROCUMULUS]: 'cirrocumulus',
    [ALTOCUMULUS]: 'altocumulus',
    [ALTOSTRATUS]: 'altostratus',
    [STRATOCUMULUS]: 'stratocumulus',
    [STRATUS]: 'stratus',
    [NIMBOSTRATUS]: 'nimbostratus',
    [CUMULUS]: 'cumulus',
    [CUMULONIMBUS]: 'cumulonimbus',
};

const typeFolder = type => path.join(__dirname, '../images/', folders[type]);

module.exports = {
    CIRRUS,
    CIRROSTRATUS,
    CIRROCUMULUS,
    ALTOCUMULUS,
    ALTOSTRATUS,
    STRATOCUMULUS,
    STRATUS,
    NIMBOSTRATUS,
    CUMULUS,
    CUMULONIMBUS,
    types,
    typeFolder,
}
