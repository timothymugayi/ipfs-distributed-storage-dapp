const router = require('express').Router();
const ipfsService = require('../controllers/ipfs_service');

router.post('/api/v1/uploads', ipfsService.ipfs_upload);

router.get('/api/v1/resources/:hash([0-9a-zA-Z]{46})', ipfsService.ipfs_get_resource_public_gateway);

router.get('/api/v1/resources', ipfsService.ipfs_get_resources);

module.exports = router;