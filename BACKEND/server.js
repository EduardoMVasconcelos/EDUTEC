const express = require("express")
const cors = require("cors")
const mysql = require("mysql2")
const jwt = require("jsonwebtoken")

const app = express()
const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = process.env

app.use(cors())
app.use(express.json())

app.post("/register", (request, response) => {
    const user = request.body.user

    console.log(user)
})

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
})

const db = mysql.createPool({
    connectionLimit: 10,
    host: DB_HOST,
    database: DB_NAME,
    user: DB_USER,
    password: DB_USER
})