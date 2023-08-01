const router = require('express').Router();
const connectFunc = require('../Connection/qlikEngineConnection');

router.get('/getDocs', connectFunc.QlikEngineConnection);

module.exports = router;