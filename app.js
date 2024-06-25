require ('dotenv').config()
const express = require("express");
const { marked } = require("marked");
const path = require("path");
const fs = require("fs");
const cors = require('cors')
const mongoose = require('mongoose')


const mongoDB = process.env.MONGO_DB_URI

main().catch((err) => console.log(err))

async function main() {
    await mongoose.connect(mongoDB)
    console.log('connected to mongoDB');
}


const authRouter = require('./routes/authRoutes')
const postRouter = require('./routes/postRoutes')


const app = express();

app.use(express.json())
app.use(cors())

app.use('/', authRouter)
app.use('/posts', postRouter)

// app.get('/', (req, res) => {
//  // render ./test.md to html
//  const filepath = path.join(__dirname, 'test.md');
//  const markdownContent = fs.readFileSync(filepath, 'utf8');

//  const htmlContent = marked(markdownContent);
//  res.send(htmlContent);
// })

app.listen(3000, () => console.log('Server started on port 3000'));