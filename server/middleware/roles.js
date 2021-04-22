module.exports = {
    isCustomer: (req, res, next) => {
        if(req.user.role === 'customer') return next();

        return res.status(403).json({ msg: 'Route availale to customer only.' });
    },
    isDesigner: (req, res, next) => {
        if(req.user.role === 'designer') return next();

        return res.status(403).json({ msg: 'Route availale to designer only.' });
    },
    isAdmin: (req, res, next) => {
        if(req.user.role === 'admin') return next();

        return res.status(403).json({ msg: 'Route availale to admin only.' });
    },
}