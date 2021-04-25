const express = require('express');
const router = express.Router();
const { Product } = require("../models/Product");
const { User } = require('../models/User');
const { Payment } = require('../models/Payment');

/**
 * Get dashboard details
 */
router.get('/details', async (req,res) => {
    const productList = await Product.find({});
    const userList = await User.find({});
    const transactions = await Payment.find({});

    const revenueGenerated = productList.reduce((num, product) => num + product.sold * product.price, 0);
    const productsSold = productList.reduce((num, product) => num + product.sold, 0);
    const designersActive = userList.filter(user => user.role === 'designer').length;
    const customersActive = userList.filter(user => user.role === 'customer').length;
    const totalUsers = userList.filter(user => user.role === 'designer' || user.role === 'customer').length;
    const numOfTransactions = transactions.length;
    // const designerRevenues;

    res.status(200).json({ revenueGenerated, productsSold, productList, userList, transactions, designersActive, customersActive, totalUsers, numOfTransactions });
})

module.exports = router;