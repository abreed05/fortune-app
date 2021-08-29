const connection = require('../models/db')
const axios = require('axios')

const getFortune = (req, res, next) => {
    let sql = "SELECT fortune_vc FROM Fortunes ORDER BY Rand() LIMIT 1"
    connection.query(sql, (err, result) => {
        res.render('index', {title: 'Fortune of the day', fortunes: result, currentUser: req.user })
    })
}

const getAddFortune = (req, res, next) => {
    res.render('addFortune', {title: 'Add Fortune', currentUser: req.user})
}

const getUserFortune = (req, res, next) => {
    const id = req.user.id
    let sql = "SELECT id,fortune_vc FROM Fortunes WHERE user_vc = ?"
    connection.query(sql,id, (err, result) => {
        res.render('userFortunes', {title: 'User Added Fortunes', fortunes: result, currentUser: req.user})
    })
}

const forwardAddFortune = (req, res, next) => {
    const id = req.user.id
    const fortune = req.body.fortune
    if (process.env.NODE_ENV == 'prod') {
        let flask_url = 'http://node-flask:5000/post-fortune'
        console.log('prod or production env set')
        axios({
            method: 'post',
            url: flask_url,
            data: {
                user: id,
                fortune: fortune
            }
        })
        .then((res)=> {
        }, (error) => {
            console.log(error);
        })
        res.redirect('/add-fortune')
    } else if (process.env.NODE_ENV == 'dev') {
        let flask_url = 'http://localhost:5000/post-fortune'
        console.log('dev or development env set')
        axios({
            method: 'post',
            url: flask_url,
            data: {
                user: id,
                fortune: fortune
            }
        })
        .then((res)=> {
        }, (error) => {
            console.log(error);
        })
        res.redirect('/add-fortune')
    } else {
        console.log("No env set")
    }

}

module.exports = {getFortune, getAddFortune, getUserFortune, forwardAddFortune}