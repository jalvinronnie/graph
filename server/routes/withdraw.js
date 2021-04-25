const express = require('express');
const router = express.Router();
const paypal = require('paypal-rest-sdk');
const {User} = require('../models/User');
const { isDesigner } = require('../middleware/roles');
const { auth } = require("../middleware/auth");

router.post("/withdraw",auth,isDesigner,(req,res)=>{
    paypal.configure({
        'mode': 'sandbox', //sandbox or live
        'client_id': process.env.CLIENT_ID,
        'client_secret': process.env.CLIENT_SECRET,
        'headers' : {
            'custom': 'header'
        }
    });
    User.findById(req.user._id,function(err,designer){
        if(designer.balance>=req.body.amount&&req.body.amount>0&&!err){
            var create_payout_json = {
                "sender_batch_header": {
                    "email_subject": "Graphica"
                },
                "items": [
                    {
                        "recipient_type": "EMAIL",
                        "amount": {
                            "value": req.body.amount,
                            "currency": "USD"
                        },
                        "receiver": req.body.email,
                        "note": "Thank you.",
                    }
                ]
            };
            var sync_mode = 'false';
            paypal.payout.create(create_payout_json, sync_mode, function (error, payout) {
                if (error) {
                    console.log(error.response);
                    throw error;
                } else {
                    console.log(payout);
                    res.send('Success');
                    let updatedBalance=designer.balance-req.body.amount;
                    User.updateOne( {_id:req.user._id},{balance: updatedBalance},function(ERR,RES){
                        if(ERR){
                            console.log(RES);
                        }
                    });
                }
            });
        }else{
            //Insufficient Balance
            res.status(400).json({err:err});
        }
    });
});

module.exports = router;
