const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(express.json())
app.use(cors())


app.listen(3002, () => {
    console.log('Server is running on port 3002')
})

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'deveplufodb',
})

app.post('/signup', (req, res) => {
    const sentFirstName = req.body.FirstName
    const sentLastName = req.body.LastName
    const sentEmail = req.body.Email
    const sentPassword = req.body.Password

    const SQL = 'INSERT INTO users (firstname, lastname, email, password) VALUES (?,?,?,?)'
    const Values = [sentFirstName, sentLastName, sentEmail, sentPassword]
    db.query(SQL, Values, (err, results) => {
        if (err) {
            res.send(err)
        } else {
            console.log('User inserted successfully!')
            res.send({ message: 'User added!' })
        }
    })
})

app.post('/login', (req, res) => {
    const sentLoginEmail = req.body.LoginEmail
    const sentLoginPassword = req.body.LoginPassword

    const SQL = 'SELECT * FROM users WHERE email = ? && password = ?'
    const Values = [sentLoginEmail, sentLoginPassword]

    db.query(SQL, Values, (err, results) => {
        if (err) {
            res.send({ error: err })
        } if (results.length > 0) {
            res.send(results)
        } else {
            res.send({ message: `Credentials Don't match!` })
        }
    })
})