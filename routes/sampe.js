var express = require('express');
var router = express.Router();
var sampleService = require('../services/sampleService');
const { runInContext } = require('vm');
const sampleDb = require('../dbs/sampleDb');


router.post('/createSample', function (req, res, next) {
    sampleService.createSample(req.body, function (err, details) {
        if (!err) {
            res.send(details);
        }
        else {
            res.status(500).send({ error: err.name, message: err.message });
        }
    });
});

router.get('/getAllData', function (req, res, next) {
    sampleService.getAllData(function (err, details) {
        if (!err) {
            res.send(details);
        }
        else {
            res.status(500).send({ error: err.name, message: err.message });
        }
    })
});

router.get('/getMinMax', function (req, res, next) {
    sampleService.minMax(function (err, result) {
        if (!err) {
            res.send(result);
        }
        else {
            res.status(500).send({ error: err.name, message: err.message });
        }
    })
})

router.get('/getMaleMinMax', function(req,res){
    sampleService.maleMinMax(function (err, result){
        if (!err) {
            res.send(result);
        }
        else {
            res.status(500).send({ error: err.name, message: err.message });
        }
    })
})

module.exports = router