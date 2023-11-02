import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/Home/Home";
import About from "./routes/About/About";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AddNote from "./routes/Home/AddNote";
import Note from "./routes/Home/Note";

function App() {
   return (
      <>
         <Router>
            <Header />
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/AddNote" element={<AddNote />} />
               <Route path="/Note/:id" element={<Note />} />
               <Route path="/About" element={<About />} />
            </Routes>
            <Footer />
         </Router>
      </>
   );
}

export default App;
