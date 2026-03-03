const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());


const ProjectSchema = new mongoose.Schema({
    title: String,
    description: String
});


const Project = mongoose.model("Project", ProjectSchema);


const dummyProjects = [
    { title: "Portfolio Website", description: "Personal website project." },
    { title: "Blog App", description: "Fullstack blog application." },
    { title: "E-commerce Store", description: "Online store built with MERN stack." }
];

const seedData = async () => {
    const count = await Project.countDocuments();
    if (count === 0) {
        await Project.insertMany(dummyProjects);
        console.log("Dummy data inserted automatically");
    }
};


mongoose.connect(process.env.MONGO_URI)
.then(async () => {
    console.log("MongoDB Connected");
    await seedData(); 
})
.catch(err => console.log(err));

// API
app.get("/projects", async (req, res) => {
    const projects = await Project.find();
    res.json(projects);
});


app.listen(5000, () => console.log("Server running on port 5000"));
