const express = require('express');
const router = express.Router();
const { Product } = require("../models/Product");
const { User } = require('../models/User');
const { Payment } = require('../models/Payment');

/**
 * Get dashboard details
 */
router.get('/details', async (req, res) => {
    const productList = await Product.find({});
    const userList = await User.find({});
    const transactions = await Payment.find({});

    const revenueGenerated = productList.reduce((num, product) => num + product.sold * product.price, 0);
    const productsSold = productList.reduce((num, product) => num + product.sold, 0);
    const designersActive = userList.filter(user => user.role === 'designer').length;
    const customersActive = userList.filter(user => user.role === 'customer').length;
    const totalUsers = userList.filter(user => user.role === 'designer' || user.role === 'customer').length;
    const numOfTransactions = transactions.length;
    let designerRevenues;

    const result = await User.find({ role: 'designer' }).populate({ path: 'products' }).exec();
    // console.log(result);
    revenues = result.map(obj => {
        const revenue = obj.products.reduce((sum, product) => sum + product['price'] * product['sold'], 0);
        return revenue;
    });

    const avgDesignerRevenue = revenues.reduce((a, b) => a + b, 0) / revenues.length;

    // const result1 = await Payment.aggregate([
    //     {
    //         $match: { 
    //             "createdAt": { 
    //                 $gte: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 30).toISOString(), 
    //                 $lte: new Date().toISOString()
    //             } 
    //         }
    //     },
    //     { $group: { "$createdAt": { createdAt: 1 } } },
    //     { $project: { _id: 1 } }
    // ]).exec();
    // console.log(result1);

    res.status(200).json({ revenueGenerated, productsSold, productList, userList, transactions, designersActive, customersActive, totalUsers, numOfTransactions, designerRevenues, avgDesignerRevenue });
})

module.exports = router;