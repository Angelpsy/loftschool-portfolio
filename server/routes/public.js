const express = require('express');
const router = express.Router();

const ctrlHome = require('../controllers/public/homepage');
const ctrlAbout = require('../controllers/public/about');
const ctrlBlog = require('../controllers/public/blog');
const ctrlWorks = require('../controllers/public/works');
const ctrlLogin = require('../controllers/public/login');

/* GET home page. */
router.get('/', ctrlHome.getPage);
router.get('/index.html', ctrlHome.getPage);
router.get('/about.html', ctrlAbout.getPage);
router.get('/blog.html', ctrlBlog.getPage);
router.get('/works.html', ctrlWorks.getPage);
router.get('/login.html', ctrlLogin.getPage);

module.exports = router;
