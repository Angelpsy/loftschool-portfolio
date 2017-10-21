const express = require('express');
const router = express.Router();

const ctrlMenu = require('../controllers/api/menu');
const ctrlWorks = require('../controllers/api/work');
const ctrlReviews = require('../controllers/api/reviews');
const ctrlSocLinks = require('../controllers/api/soc-links');
const ctrlPost = require('../controllers/api/post');
const ctrlSkills = require('../controllers/api/skill');
const ctrlContacts = require('../controllers/api/contancts');
const ctrlFeedback = require('../controllers/api/feedback');
const ctrlAuth = require('../controllers/api/auth');

/**
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return {*}
 */
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({
        success: false,
        error: true,
        messageError: 'Необходима авторизация',
    });
}

router.get('/menu', ctrlMenu.getPage);
router.get('/works', ctrlWorks.getWorks);
router.post('/work', isLoggedIn, ctrlWorks.createWork);
router.get('/reviews', ctrlReviews.getPage);
router.get('/soc-links', ctrlSocLinks.getPage);
router.get('/posts', ctrlPost.getPosts);
router.post('/post', isLoggedIn, ctrlPost.createPost);
router.get('/skills', ctrlSkills.getSkills);
router.post('/skill-group', isLoggedIn, ctrlSkills.createGroup);
router.post('/skill-item', isLoggedIn, ctrlSkills.createItem);
router.get('/contacts', ctrlContacts.getPage);
router.get('/feedback', ctrlFeedback.getPage);
router.post('/feedback', ctrlFeedback.getPage);
router.post('/login', ctrlAuth.login);

router.get('*', function(req, res) {
    res.status(404).json({
        success: false,
        error: true,
        messageError: 'Неизвестный url',
    });
});

module.exports = router;
