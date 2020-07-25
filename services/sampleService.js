var sampleDb = require('../dbs/sampleDb');
var sampleDb3 = require('../dbs/sampleDb3');
var sampleDb2 = require('../dbs/sampleDb2');
var mongodb = require('../dbs/MongodbUtil');

function getAllData(callback) {
    sampleDb.getAll(callback);
}

function createSample(data, callback) {
    sampleDb.create(data, callback);
}

function minMax(callback){
    sampleDb3.minMax(callback);
}

function maleMinMax(callback){
    sampleDb3.maleMinMax(callback);
}

module.exports.getAllData = getAllData;
module.exports.createSample = createSample;
module.exports.minMax = minMax;
module.exports.maleMinMax = maleMinMax;