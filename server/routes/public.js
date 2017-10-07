const express = require('express');
const router = express.Router();

const ctrlHome = require('../controllers/homepage');
const ctrlAbout = require('../controllers/about');
const ctrlBlog = require('../controllers/blog');
const ctrlWorks = require('../controllers/works');
const ctrlLogin = require('../controllers/login');

/* GET home page. */
router.get('/', ctrlHome.getPage);
router.get('/index.html', ctrlHome.getPage);
router.get('/about.html', ctrlAbout.getPage);
router.get('/blog.html', ctrlBlog.getPage);
router.get('/works.html', ctrlWorks.getPage);
router.get('/login.html', ctrlLogin.getPage);

module.exports = router;
