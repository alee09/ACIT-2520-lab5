/*
 Authors: 
 Your name and student #: Adrian Lee
 Your Partner's Name and student #: Tama Irman
 (Make sure you also specify on the Google Doc)
*/
const express = require("express");

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
let allMovies = [];

app.get("/", (req, res) => res.render("views/pages/index", {allMovies}));

app.get("/myForm", (req, res) => res.render("views/pages/myForm"));

app.post("myForm", (req, res) => {
  const { movies } =  req.body;
  allMovies = movies.split(",");
  res.redirect("/");
});

app.get("/myListQueryString", (req, res) => {
  let queries = [];
  for(let query in req.query){
    queries.push(req.query[query]);
  }
  allMovies = queries;
  res.redirect("/")
});

app.get("/search/:movieName", (req, res) => {
  const searchTerm = req.params.movieName;
  fs.readfile("./movieDescriptions.txt", "utf8", (err,file) =>{
    if(err){
      console.log(err)
    } else {
      const lineArray = file.split("/n");
      for(l in lineArray){
        let [movieName, movieDescription] = l.split(":");
        if(movieName.toLowerCase() == searchTerm.toLowerCase()){
          res.render("pages/searchresult", {searchTerm, movieDescription});
          return;
        }
      }
      res.render("pages/searchResult", {searchTerm: null, movieDescription: "movie could not be found",
      });
    }
  })
});

app.listen(3000, () => {
  console.log("Server is running on port 3000 🚀");
});