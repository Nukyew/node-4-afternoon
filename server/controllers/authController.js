const users = require('../models/users')
let id = 1

module.exports = {
    login: (req, res, next) => {
        let {username, password} = req.body
        if(username && password){
            const index = users.findIndex(el => el.username === username)
            if (index !== -1){
                if(users[index].username === username && users[index].password === password){
                    req.session.user.username = username
                    res.status(200).send(req.session.user)
                } else {
                    res.status(500).send('password does not match')
                }   
            } else if (index === -1){
                res.status(500).send('not found')
            }
        } else {
            res.status(500).send('Username and/or Password Not Specified')
        }
    },
    register: (req, res, next) => {
        let {username, password} = req.body
        users.push({id, username, password})
        id++
        req.session.user.username = username
        res.status(200).send(req.session.user)
    },
    signout: (req, res, next) => {
        req.session.destroy()
        res.status(200).send(req.session) /* MIGHT have to be req.session.user */
    },
    getUser: (req, res, next) => {
        res.status(200).send(req.session.user)
    }
}