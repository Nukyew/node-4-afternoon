const swag = require('../models/swag')

module.exports = {
    add: (req, res, next) => {
        const {id} = req.params
        const cartIndex = req.session.user.cart.findIndex(el => el.id === +id)
        if(cartIndex !== -1){
            res.status(200).send(req.session.user)
        } else {
            const index = swag.findIndex(el => el.id === +id)
            req.session.user.cart.push(swag[index])
            req.session.user.total = swag[index].price + req.session.user.total
            res.status(200).send(req.session.user)
        }
    },
    delete: (req, res, next) => {
        const {id} = req.params
        const itemIndex = req.session.user.cart.findIndex(el => el.id === +id)
        req.session.user.total = req.session.user.total - req.session.user.cart[itemIndex].price
        req.session.user.cart.splice(itemIndex, 1)
        res.status(200).send(req.session.user)
    },
    checkout: (req, res, next) => {
        req.session.user.cart = []
        req.session.user.total = 0
        res.status(200).send(req.session.user)
    }
}