import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { authenticate } from './middleware/auth.js'
import jwt from 'jsonwebtoken';

const app = express();
const PORT = 5001;

app.use(cors());
app.use(bodyParser.json());

const posts = [];

const user = {
    username: 'testuser',
    password: 'password123'
};

app.get('/', (req, res) => {
    res.send("hello World")

})

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if (username === user.username && password === user.password) {
        const token = jwt.sign({ username }, process.env.SECRET_KEY || 'defaultkey', {
            expiresIn: '1h',
        });
        res.json({ token });
    } else {
        res.status(401).send('Invalid username or password');
    }
});


app.get('/api/posts', (req, res) => {
    res.json(posts);
})

app.post('/api/posts', (req, res) => {
    const { title, content } = req.body;
    const newPost = { id: posts.length + 1, title, content, createdAt: new Date() };
    posts.push(newPost);
    res.status(201).json(newPost);
});

app.get('/api/posts/:id', (req, res) => {
    const post = posts.find((p) => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).send('Post not found');
    res.json(post);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


