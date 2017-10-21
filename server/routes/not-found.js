const express = require('express');
const router = express.Router();

router.get('*', (req, res) => {
    res.send('Неизвестный url', 404);
});

module.exports = router;
