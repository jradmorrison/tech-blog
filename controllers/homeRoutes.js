const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// GET ROUTES for all views

// Home
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll();

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// users dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: { user_id: req.session.user_id },
      include: [{ model: User, attributes: ["username"] }],
    });

    if (!postData.length) {
      res.render('noData', {
        logged_in: req.session.logged_in,
      })
    } else {
      const posts = postData.map((post) => post.get({ plain: true }));

      res.render('dashboard', {
        posts,
        logged_in: req.session.logged_in,
      })
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

// view selcted post
router.get('/posts/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['username'] },
        {
          model: Comment,
          include: [{ model: User, attributes: ['username'] }],
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render('post', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Edit specific post form
router.get('/edit-posts/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['username'] },
        {
          model: Comment,
          include: [{ model: User, attributes: ['username'] }],
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render('edit-post', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new post form
router.get('/new-post', withAuth, (req, res) => {
  try {
    res.render('new-post', {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login form
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

// Signup form
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('signup');
});

module.exports = router;
