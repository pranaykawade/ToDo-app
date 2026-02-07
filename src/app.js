require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const notesModel = require("./models/notes.model");

app.use(express.json());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PATCH", "DELETE"],
}));

app.use(express.static("./public"))

app.get("/api/notes", async (req, res) => {
  const notes = await notesModel.find();
  res.status(200).json({
    message: "fetched successfully",
    notes,
  });
});
 
app.post("/api/notes" , async(req,res)=>{
    const {title,description} = req.body;
    
    await notesModel.create({
        title,
        description
    });

    res.status(200).json({
        message:"notes created successfully",
    });
});

app.delete("/api/notes/:id", async (req,res)=>{
    const {id} = req.params;

    await notesModel.findByIdAndDelete(id);

    res.status(201).json({
        message:"note deleted successfully",
    });
});


app.patch("/api/notes/:id" , async (req,res)=>{
    const {id} = req.params;
    const {title,description} = req.body; 

    await notesModel.findByIdAndUpdate(id ,{
        title,
        description
    });

    res.status(201).json({
        message:"updated successfully"
    });
});

app.use("*name" ,(req,res)=>{
    res.sendFile(path.join(__dirname , ".." , "/public/index.html"));
});


module.exports = app;