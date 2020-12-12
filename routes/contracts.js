const express = require('express');
const router = express.Router();
// Load User model
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');
const Gig = require('../models/Gig');
const Contract = require('../models/Contract');


// create gig
router.post('/create', async(req, res) => {
  const { 
    seller,
    buyer,
    amount,
    gig,
  }= req.body;
  let errors = [];

  if (!seller || !buyer || !amount || !gig ) {
    errors.push({ msg: 'ERROR TRY AGAIN PLEASE' });
  }


  if (errors.length > 0) {
    
    console.log(req.body)
    res.render('gigs', {
      errors, user:req.user
    });
  } else {
        const gig = Gig.findOne({ _id:req.body.gig_id }).then((gig)=>{
        seller = req.user;
        buyer = gig.owner;
        amount = gig.amount;
        gigb = gig;
        })
        console.log({gig});
            const newContract = new Contract({
                seller,
    buyer,
    amount,
    gig,
            });

            newContract.save()
            .then(contract => {
                console.log({contract});
              req.flash(
                'success_msg',
                'Your Order Was Placed Successfully'
              );
              res.redirect('/dashboard');
            })
            .catch(err => console.log(err));
  }
});

module.exports = router;