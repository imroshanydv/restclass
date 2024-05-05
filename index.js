const express = require("express");
const app = express();
const {v4 : uuidv4} = require("uuid");
var methodOverride = require("method-override");

const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride("_method"));

const port = 8080;

let posts = [
    {
        id: uuidv4(),
        username: "rahulkumar",
        content: "Honesty is the best policy."
    },
    {
        id: uuidv4(),
        username: "roshanyadav",
        content: "Focus on your goal never distract."
    },
    {
        id: uuidv4(),
        username: "ramkumar",
        content: "Thanks for your best wishes."
    }
]

app.get("/posts", (req, res) => {
    res.render("index.ejs", {posts});
})

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
})

app.post("/posts", (req, res) => {
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    res.redirect("/posts");
})

app.get("/posts/:id", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => (id) === p.id);
    res.render("show.ejs", {post});
})

app.get("/posts/:id/edit", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => (id) === p.id);
    res.render("edit.ejs", {post});
})

app.patch("/posts/:id", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => (id) === p.id);
    let newContent = req.body.content;
    post.content = newContent;
    res.redirect("/posts");
})

app.delete("/posts/:id", (req, res) => {
    let {id} = req.params;
    posts = posts.filter((p) => (id) !== p.id);
    res.redirect("/posts");
})

app.listen(port, () => {
    console.log("App is listening on the port 8080;");
})