const express = require('express');
const router = express.Router();
// Load User model
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');
const Gig = require('../models/Gig');

// get all gigs
router.get('/', async (req, res) => {
  try {
      const gig = await Gig.find();
      if (!gig) throw new Error('No gig found');
      const sorted = gig.sort((a, b) => {
          return new Date(a.date).getTime()- new Date(b.date).getTime();
      });
      res.render('gigs', { gigs:sorted });

  }catch (error){
      res.status(500).json({message: error.message})
  }
 
});

router.get('/:id',async (req,res)=>{
    const {id} = req.params

    try {
            let gig = await Gig.findById({_id:id})
            if(!gig) throw Error('Something went wrong')
             gig = { ... gig._doc, ... req.body}
             console.log(gig)
             const user = User.findOne({ _id: gig.owner }).then((user)=>{
              
              res.render('gig', {
                gig,owner:user
              });
             })
        
    }catch (error){
        res.status(500).json({message: error.message})
    }
})

// create gig
router.post('/create', (req, res) => {
  const { title,
  amount,
  skills,
  image_url,
  description,
  expectedDuration}= req.body;
  let errors = [];

  if (!title || !amount || !skills || !image_url || !description || !expectedDuration ) {
    errors.push({ msg: 'Please enter all fields' });
  }


  if (errors.length > 0) {
    
    console.log(req.body)
    res.render('login', {
      errors,
      title,
      amount,
  skills,
  image_url,
  description,
  expectedDuration
    });
  } else {
        owner = req.user
        console.log({owner});
            const newGig = new Gig({
              title,
                amount,
                skills,
                image_url,
                description,
                expectedDuration,
                owner
            });

            newGig.save()
            .then(gig => {
                console.log({gig});
              req.flash(
                'success_msg',
                'GIG Created Successfully'
              );
              res.redirect('/dashboard');
            })
            .catch(err => console.log(err));
  }
});

module.exports = router;