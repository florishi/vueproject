const express = require('express');
const router = express.Router();

// route to send user history logs
router.get('/', (req, res) => {
  res.render('history');
});

module.exports = router;