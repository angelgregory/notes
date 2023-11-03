require("dotenv").config();

const cors = require("cors");
const express = require("express");
const connectDB = require("./connectDB");
const notes = require("./models/notes");

const app = express();

const PORT = process.env.PORT || 8000;

connectDB();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//get all notes
app.get("/api/notes", async (req, res) => {
   try {
      const data = await notes.find({});
      if (!data) {
         throw new Error("an error occured fetching notes.");
      } else {
         res.status(201).json(data);
      }
   } catch (error) {
      res.status(500).json({ error: "an error occured fetching notes." });
   }
});
//get note by id
app.get("/api/notes/:id", async (req, res) => {
   try {
      const noteId = req.params.id;
      const data = await notes.findById(noteId);
      if (!data) {
         throw new Error("an error occured fetching a note.");
      } else {
         res.status(201).json(data);
      }
   } catch (error) {
      res.status(500).json({ error: "an error occured fetching a note." });
   }
});
//create a note
app.post("/api/notes", async (req, res) => {
   try {
      const { title, description, ip } = req.body;

      const data = await notes.create({ title, description, ip });
      if (!data) {
         throw new Error("an error occured creating a note.");
      } else {
         res.status(201).json(data);
      }
   } catch (error) {
      res.status(500).json({ error: "an error occured creating a note." });
   }
});
//update note
app.put("/api/notes/:id", async (req, res) => {
   try {
      const noteId = req.params.id;
      const { title, description } = req.body;

      const data = await notes.findByIdAndUpdate(noteId, {
         title,
         description,
      });
      if (!data) {
         throw new Error("an error occured updating a note.");
      } else {
         res.status(201).json(data);
      }
   } catch (error) {
      res.status(500).json({ error: "an error occured updating a note." });
   }
});
//delete note
app.delete("/api/notes/:id", async (req, res) => {
   try {
      const noteId = req.params.id;

      const data = await notes.findByIdAndDelete(noteId);
      if (!data) {
         throw new Error("an error occured deleting a note.");
      } else {
         res.status(201).json(data);
      }
   } catch (error) {
      res.status(500).json({ error: "an error occured deleting a note." });
   }
});
app.get("/", (req, res) => {
   res.json("hello world");
});

app.get("*", (req, res) => {
   res.status(404).json({ message: "Not Found" });
});

// app.listen(PORT, () => {
//    console.log(`server is running on PORT: ${PORT}`);
// });

// app.all("*", (req, res) => {
//    res.json({ "every thing": "is awesome" });
// });

//Connect to the database before listening
connectDB().then(() => {
   app.listen(PORT, () => {
      console.log("listening for requests");
   });
});
