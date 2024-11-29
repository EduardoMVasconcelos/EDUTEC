const express = require("express")
const cors = require("cors")
const mysql = require("mysql2")
const jwt = require("jsonwebtoken")

const app = express()

const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD, SECRET_KEY } = process.env

app.use(cors())
app.use(express.json())

function authenticateToken(req, res, next) {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).json({ message: "Token necessário" });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: "Token inválido" });
        req.user = user;  // O `req.user` agora deve conter `id` e `username`
        next();
    });
}

app.post("/register", (request, response) => {
    const user = request.body.user

    console.log(user)
    const searchCommand = `
        SELECT * FROM Users
        WHERE email = ?
    `

    db.query(searchCommand, [user.email], (error, data) => {
        if (error) {
            console.log(error)
            return
        } 
        
        if(data.length != 0) {
            response.json({ message: "Já existe um usuário cadastrado com esse email.", userExists: true})
            return
        }

        const insertCommand = `
            INSERT INTO Users(name, email, password)
            VALUES (?, ?, ?)
        `

        db.query(insertCommand, [user.name, user.email, user.password], (error) => {
            if(error) {
                console.log(error)
                return
            }

            response.json({ message: "Usuário cadastrado!"})
        })
    })
})

app.post("/login", (request, response) => {
    const user = request.body.user

    const searchCommand = `
        SELECT * FROM Users
        WHERE email = ?
    `

    db.query(searchCommand, [user.email], (error, data) => {
        if(error) {
            console.log(error)
            return
        }

        if(data.length === 0) {
            response.json({ message: "Não existe nenhum usuário cadastrado com esse email"})
            return
        }

        if (user.password === data[0].password) {
            const email = user.email
            const id = data[0].id
            const name = data[0].name
            const token = jwt.sign({ id, email, name }, SECRET_KEY, { expiresIn: "1h" })
            response.json({ token, ok: true })
            return
        }

        response.json({ message: "Credenciais inválidas!"})
    })
})

app.get("/verify", (request, response) => {
    const token = request.headers.authorization

    jwt.verify(token, SECRET_KEY, (error, decoded) => {
        if(error) {
            response.json({ message: "Token Inválido"})
            return
        }

        response.json({ ok: true })
    })
})

app.get("/getname", (request, response) => {
    try {
        // Corrige a obtenção do token
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            return response.status(401).json({ error: "JWT token must be provided" });
        }

        // Extrai o token do cabeçalho "Bearer <token>"
        const token = authHeader.split(' ')[1];

        if (!token) {
            return response.status(401).json({ error: "Token missing from Authorization header" });
        }

        // Verifica o token
        const decoded = jwt.verify(token, SECRET_KEY);

        response.json({ name: decoded.name });
    } catch (error) {
        console.error(error);

        if (error.name === 'JsonWebTokenError') {
            return response.status(401).json({ error: "Invalid token" });
        }

        return response.status(500).json({ error: "Internal server error" });
        // USEI CHATGPT MESMO, NÃO CONSEGUI ACHAR O Error, PERDOA MARCIO E BENONE   S
    }
}); 

app.post("/save-score", authenticateToken, (req, res) => {
    const { score } = req.body;
    const userId = req.user.id;

    db.query("INSERT INTO scores (user_id, score) VALUES (?, ?)", [userId, score], (err) => {
        if (err) {
            console.error("Erro ao salvar pontuação:", err);  // Log do erro para diagnóstico
            return res.status(500).json({ message: "Erro ao salvar pontuação!" });
        }
        res.status(200).json({ message: "Pontuação salva com sucesso!" });
    });
});

app.get("/api/ranking", authenticateToken, (req, res) => {
    const query = `
        SELECT users.username, scores.score
        FROM scores
        JOIN users ON scores.user_id = users.id
        ORDER BY scores.score DESC;
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error("Erro ao buscar o ranking:", err);
            return res.status(500).json({ message: "Erro ao buscar o ranking" });
        }
        res.status(200).json(results);
    });
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
})

const db = mysql.createPool({
    connectionLimit: 10,
    host: DB_HOST,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD
})