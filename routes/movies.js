const Movies = require('../models/movies');
const express = require('express');
const router = express.Router();


router.post('/movie',async (req,res)=>{
  const resp = await Movies.addMovie(req.body);
  res.send(resp);
});

router.post('/movies',async (req,res)=>{
    const resp = await Movies.addMultipleMovie(req.body);
    res.send(resp);
  });

router.get('/movies',async (req,res)=>{
  const resp = await Movies.getMoviesByKeyword(req.query);
  res.send(resp);
});

module.exports = router;
