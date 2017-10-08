const express = require('express');
const router = express.Router();

const ctrlMenu = require('../controllers/api/menu');
const ctrlWorks = require('../controllers/api/works');
const ctrlReviews = require('../controllers/api/reviews');
const ctrlSocLinks = require('../controllers/api/soc-links');
const ctrlPosts = require('../controllers/api/posts');
const ctrlSkills = require('../controllers/api/skills');
const ctrlContacts = require('../controllers/api/contancts');
const ctrlFeedback = require('../controllers/api/feedback');

/* GET home page. */
router.get('/menu', ctrlMenu.getPage);
router.get('/works', ctrlWorks.getPage);
router.get('/reviews', ctrlReviews.getPage);
router.get('/soc-links', ctrlSocLinks.getPage);
router.get('/posts', ctrlPosts.getPage);
router.get('/skills', ctrlSkills.getPage);
router.get('/contacts', ctrlContacts.getPage);
router.get('/feedback', ctrlFeedback.getPage);
router.post('/feedback', ctrlFeedback.getPage);

module.exports = router;
