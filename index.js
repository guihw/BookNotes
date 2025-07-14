import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import pg from 'pg';
import 'dotenv/config';

const app = express();
const port = 3000;

const db = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

db.connect();

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));


app.get("/", async (req, res)=>{
    const ordenar = req.query.ordenar || "0";
    try{
        const result = ordenar == 0 ? await db.query("SELECT * FROM Anotacoes") 
        : (ordenar === "titulo" ? await db.query("SELECT * FROM Anotacoes ORDER BY title ASC") 
        : (ordenar === "recente" ? await db.query("SELECT * FROM Anotacoes ORDER BY id DESC") 
        : await db.query("SELECT * FROM Anotacoes ORDER BY id ASC ")));

        res.render("index.ejs", {
            rows: result.rows,
            ordenar: ordenar
        });       
    } catch(err){
        console.log(err);
        res.status(500).send("Database error");
    }
});

app.post("/criar", async(req, res)=>{
    const isbn = req.body.isbn;
    const text = req.body.textoAnotacao;
    let bookTitle = null;
    try{
        const getTitleApi = await axios.get(`https://openlibrary.org/isbn/${isbn}.json`);
        bookTitle = getTitleApi.data.title;
    } catch(error){
        console.log("Error fetching book title: ", error);
    }
    try{
        await db.query("INSERT INTO Anotacoes(isbn, note, title) VALUES ($1, $2, $3) RETURNING *;", [isbn, text, bookTitle]);
        res.redirect("/");
    } catch(err){
        console.error("Database error: ", err);
        res.status(500).send("Database error");
    }
});

app.delete("/excluir", async(req, res)=>{
    const post = req.body.id;
    console.log(post);
    try{
        await db.query("DELETE FROM Anotacoes WHERE Id = $1", [post]);
        res.sendStatus(200);
    } catch (err){
        console.error("Erro ao deletar ", err);
        res.sendStatus(500)
    }
});

app.post("/editar", async(req, res)=>{
    const {id, textoAnotacao} = req.body;
    try{
        await db.query("UPDATE Anotacoes SET note = $1 WHERE id = $2", [textoAnotacao, id]);
        const result = await db.query("SELECT * FROM Anotacoes");
        res.redirect("/");
    } catch(err){
        console.error("Database error: ", err);
        res.status(500).send("Database error");
    }
});


app.listen(port, ()=>{
    console.log(`Running on port ${port}`);
})