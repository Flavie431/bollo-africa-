const express = require('express');
const router = express.Router();
// Load User model
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');
const Gig = require('../models/Gig');

router.get('/:id',async (req,res)=>{
    const {id} = req.params

    try {
            let gig = await Gig.findById({_id:id})
            if(!gig) throw Error('Something went wrong')
             gig = { ... gig._doc, ... req.body}
             console.log(gig)
        res.render('register', {
            gig
          });
    }catch (error){
        res.status(500).json({message: error.message})
    }
})

// Register
router.post('/create', (req, res) => {
  const { title,
  amount,
  skills,
  image_url,
  description,
  expecteDuration}= req.body;
  let errors = [];

  if (!title || !amount || !skills || !image_url || !description || !expecteDuration ) {
    errors.push({ msg: 'Please enter all fields' });
  }


  if (errors.length > 0) {
    res.render('register', {
      errors,
      amount,
  skills,
  image_url,
  description,
  expecteDuration
    });
  } else {
            owner = re.user;
            const newGig = new Gig({
                amount,
                skills,
                image_url,
                description,
                expecteDuration,
                owner
            });

            newGig.save()
            .then(gig => {
                console.log({gig});
              req.flash(
                'success_msg',
                'You are now registered and can log in'
              );
              res.redirect('/dashboard');
            })
            .catch(err => console.log(err));
  }
});

module.exports = router;