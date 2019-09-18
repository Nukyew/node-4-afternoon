const swag = require('../models/swag')

module.exports = {
    search: (req, res) => {
        const {category} = req.query
        const filteredSwag = swag.filter(el => el.category.includes(category))
        if (filteredSwag.length === 0){
            res.status(200).send(swag)
        } else {
            res.status(200).send(filteredSwag)
        }
    }
}