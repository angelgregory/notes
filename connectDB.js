const mongoose = require("mongoose");

const connectDB = async () => {
   try {
      mongoose.set("strictQuery", false);
      const conn = await mongoose.connect(process.env.MONGODB_URI);
      console.log(`Database Connected ${conn.connection.host}`);
   } catch (error) {
      console.log(error);
      process.exit(1);
   }
};
app.all("*", (req, res) => {
   res.json({ "every thing": "is awesome" });
});

//Connect to the database before listening
connectDB().then(() => {
   app.listen(PORT, () => {
      console.log("listening for requests");
   });
});
module.exports = connectDB;
