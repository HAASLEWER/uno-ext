'use strict';

var _ = require('underscore'),
    childProcess = require('child_process'),
    mime = require('mime');

var unoconv = exports = module.exports = {};

/**
* Convert a document and extract the txt contents.
*
* @param {String} file
* @param {String} outputFormat
* @param {Function} callback
* @api public
*/
unoconv.convert = function(file, outputFormat, callback) {

    var self = this,
        bin = 'unoconv',
        child,
        stdout = [],
        stderr = [];

    bin += " -f " + outputFormat + " --stdout " + file;

    child = childProcess.exec(bin, function (err, stdout, stderr) {
        if (err) {
            return callback(err);
        }

        if (stderr) {
            return callback(new Error(stderr.toString()));
        }

        callback(null, stdout);
    });

    child.stdout.on('data', function (data) {
        stdout.push(data);
    });

    child.stderr.on('data', function (data) {
        stderr.push(data);
    });

    child.on('exit', function () {
        if (stderr.length) {
            return callback(new Error(Buffer.concat(stderr).toString()));
        }

        callback(null, Buffer.concat(stdout));
    });
};