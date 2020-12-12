const express = require('express');
const router = express.Router();
// Load User model
const User = require('../models/User');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

const Gig = require('../models/Gig');
const Contract = require('../models/Contract');
const { compareSync } = require('bcryptjs');


// create gig
router.post('/create',ensureAuthenticated, async(req, res) => {
  let errors = [];
 const gig = await Gig.findOne({ _id:req.body.gig_id }).then((gig)=>{
     console.log({"sdfsdvsdsdvdsv=============":gig})
      const  seller = gig.owner;
     const    buyer = req.user;
        amount = gig.amount;
        messages = [req.body.message]
        gigb = gig;
        gig_purchase = gig.ordered_times + 1
        })
            const newContract = new Contract({
                buyer,
                amount,
                gig,
                seller,
                messages,
                
            });

            newContract.save()
            .then(async(contract) => {
                const response = await Gig.findByIdAndUpdate(gig._id,{ordered_times:gig_purchase})
          if(!response) throw Error('Something went wrong')
                console.log({contract});
              req.flash(
                'success_msg',
                'Your Order Was Placed Successfully, You will be contacted by the owner for details '
              );
              res.redirect('/dashboard');
            })
            .catch(err => console.log(err));
  
});

module.exports = router;