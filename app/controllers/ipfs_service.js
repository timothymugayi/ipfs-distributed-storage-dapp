const _ = require('lodash');
const Busboy = require('busboy');
const request = require('request');

exports.ipfs_get_resource_public_gateway = function (req, res) {
    request('https://ipfs.github.io/public-gateway-checker/gateways.json', {json: true}, (err, response, body) => {
        if (err)
            return err;
        if (_.isEmpty(body))
            throw new Error('Unable to find IPFS public gateways');
        const resourceLinks = body.map(function (e) {
            return e.replace(':hash', req.params.hash);
        });
        return res.send(resourceLinks);
    });
};

exports.ipfs_get_resources = function (req, res) {
    return res.send({file_name: 'unknown', hash: 'unknown'});
};

exports.ipfs_upload = function (req, res) {
    /**
     * Add file to local node, other nodes will replicate content if they choose to syndicate it.
     * @param node
     * @param filename
     * @param data
     */
    const addContentLocalNode = async (node, filename, data) => {
        const filesAdded = await node.add({path: filename, content: data});
        const fileBuffer = await node.cat(filesAdded[0].hash);
        console.log('Added file contents:', fileBuffer.toString());
        console.log('Added file:', filesAdded[0].path, filesAdded[0].hash)
    };

    const busboy = new Busboy({headers: req.headers});
    console.log(req.headers);
    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        file.on('data', function (data) {
            console.log('File [' + fieldname + ' ' + filename + '] got ' + data.length + ' bytes');
        });
        file.on('end', function () {
            console.log('File [' + fieldname + ' ' + filename + '] Finished');
        });
        addContentLocalNode(req.node, filename, file);
    });
    busboy.on('finish', function () {
        res.writeHead(200, {'Connection': 'close'});
        res.end("Completed file upload....!");
    });
    return req.pipe(busboy);
};