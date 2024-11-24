const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cors = require("cors"); // Importar o cors
const db = require("./database");

const app = express();
const PORT = 3000;
const SECRET_KEY = "sua_chave_secreta";

// Configuração do CORS
app.use(cors()); // Permitir requisições de qualquer origem

app.use(bodyParser.json());

// Rota de cadastro de usuário
app.post("/api/register", async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword], (err) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ message: "Usuário já existe!" });
                }
                return res.status(500).json({ message: "Erro ao cadastrar usuário!" });
            }
            res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
        });
    } catch (error) {
        res.status(500).json({ message: "Erro ao cadastrar!" });
    }
});

// Rota de login
app.post("/api/login", (req, res) => {
    const { username, password } = req.body;

    db.query("SELECT * FROM users WHERE username = ?", [username], async (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).json({ message: "Credenciais inválidas" });
        }

        const user = results[0];
        const match = await bcrypt.compare(password, user.password);

        if (match) {
            // Inclua `id` no payload do token JWT
            const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: "1h" });
            res.json({ token });
        } else {
            res.status(401).json({ message: "Credenciais inválidas" });
        }
    });
});

// Middleware para validar o token JWT
function authenticateToken(req, res, next) {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).json({ message: "Token necessário" });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: "Token inválido" });
        req.user = user;  // O `req.user` agora deve conter `id` e `username`
        next();
    });
}

// Rota protegida (Bem-vindo)
app.get("/api/welcome", authenticateToken, (req, res) => {
    res.json({ message: `Bem-vindo, ${req.user.username}!` });
});


// Rota para salvar a pontuação
app.post("/api/save-score", authenticateToken, (req, res) => {
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

// Rota para obter o ranking de pontuações
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

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});