//Create a web server
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//Read the comments file
const commentsPath = path.join(__dirname, 'comments.json');
let comments = [];
if (fs.existsSync(commentsPath)) {
    comments = JSON.parse(fs.readFileSync(commentsPath, 'utf8'));
}

//Create a GET route to get all the comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

//Create a POST route to add a comment
app.post('/comments', (req, res) => {
    const comment = req.body;
    comments.push(comment);
    fs.writeFileSync(commentsPath, JSON.stringify(comments, null, 2));
    res.status(201).json(comment);
});

//Create a DELETE route to delete a comment
app.delete('/comments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = comments.findIndex(comment => comment.id === id);
    if (index !== -1) {
        comments.splice(index, 1);
        fs.writeFileSync(commentsPath, JSON.stringify(comments, null, 2));
    }
    res.status(204).send();
});

//Start the web server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});