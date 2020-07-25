var mongodb = require('./MongodbUtil');

function create(record, callback) {
    var db = mongodb.getDb();
    var coll = db.collection(this.getCollectionName());
    coll.insert(record, function (err, result) {
        if (!err) {
            callback(null, result.ops[0]);
        } else {
            callback(err, null);
        }
    });
}

function createMany(records, callback) {
    var db = mongodb.getDb();
    var coll = db.collection(this.getCollectionName());
    coll.insertMany(records, function (err, result) {
        if (!err) {
            callback(null, result.ops[0]);
        } else {
            callback(err, null);
        }
    });
}

function getAll(callback) {
    var db = mongodb.getDb();
    var coll = db.collection(this.getCollectionName());
    coll.find({}).toArray(function (err, result) {
        if (!err) {
            callback(null, result);
        } else {
            callback(err, null);
        }
    });
}


function getById(id, callback) {
    var db = mongodb.getDb();
    var coll = db.collection(this.getCollectionName());
    coll.findOne({ _id: mongodb.ObjectID(id) }, function (err, result) {
        if (!err) {
            callback(null, result);
        } else {
            callback(err, null);
        }
    });
}

function minMax(callback) {
    var db = mongodb.getDb();
    var coll = db.collection(this.getCollectionName());
    coll.aggregate([{
        $facet: {
            minUsages: [
                {
                    $sort: {
                        population: 1
                    }
                }
            ],
            maxUsages: [
                {
                    $sort: {
                        population: -1
                    }
                }
            ]
        }
    },
    {
        $addFields: {
            lowestUsages: {
                $arrayElemAt: [
                    "$minUsages",
                    0
                ]
            },
            highestUsages: {
                $arrayElemAt: [
                    "$maxUsages",
                    0
                ]
            }
        }
    },
    {
        $project: {
            minUsages: {
                $filter: {
                    input: "$minUsages",
                    as: "minUsage",
                    cond: {
                        $eq: [
                            "$$minUsage.usages",
                            "$lowestUsages.usages"
                        ]
                    }
                }
            },
            maxUsages: {
                $filter: {
                    input: "$maxUsages",
                    as: "maxUsage",
                    cond: {
                        $eq: [
                            "$$maxUsage.usages",
                            "$highestUsages.usages"
                        ]
                    }
                }
            }
        }
    }], function (err, result) {
        if (!err) {
            callback(null, result);
        } else {
            callback(err, null);
        }

    });
}

function maleMinMax(callback) {
    var db = mongodb.getDb();
    var coll = db.collection(this.getCollectionName());
    coll.aggregate([{
        $facet: {
            minUsages: [
                {
                    $sort: {
                        "populationbygender.male": 1
                    }
                }
            ],
            maxUsages: [
                {
                    $sort: {
                        population: -1
                    }
                }
            ]
        }
    },
    {
        $addFields: {
            lowestUsages: {
                $arrayElemAt: [
                    "$minUsages",
                    0
                ]
            },
            highestUsages: {
                $arrayElemAt: [
                    "$maxUsages",
                    0
                ]
            }
        }
    },
    {
        $project: {
            minUsages: {
                $filter: {
                    input: "$minUsages",
                    as: "minUsage",
                    cond: {
                        $eq: [
                            "$$minUsage.usages",
                            "$lowestUsages.usages"
                        ]
                    }
                }
            },
            maxUsages: {
                $filter: {
                    input: "$maxUsages",
                    as: "maxUsage",
                    cond: {
                        $eq: [
                            "$$maxUsage.usages",
                            "$highestUsages.usages"
                        ]
                    }
                }
            }
        }
    }], function (err, result) {
        if (!err) {
            callback(null, result);
        } else {
            callback(err, null);
        }

    });
}


function getDb() {
    return monogdb.getDb();
}


module.exports = function BaseDao(collectionName) {
    return {
        create: create,
        createMany: createMany,
        getAll: getAll,
        getById: getById,

        maleMinMax:maleMinMax,
        getDb: getDb,
        minMax: minMax,
        getCollectionName: function () {
            return collectionName;
        },
    };
};
