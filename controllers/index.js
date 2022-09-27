const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const towerRoutes = require('./tower-routes');
router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/tower',towerRoutes);
module.exports = router;