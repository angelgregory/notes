import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AddNote() {
   const baseURL = `${import.meta.env.VITE_SERVER_URL}/api/notes`;
   const [description, setDescription] = useState("");
   const [title, setTitle] = useState("");
   const [ip, setIp] = useState("");
   const [submitted, setSubmitted] = useState(false);

   const getData = async () => {
      const res = await axios.get("https://api.ipify.org/?format=json");
      console.log(res.data);
      setIp(res.data.ip);
   };
   useEffect(() => {
      console.log(ip);
      //passing getData method to the lifecycle method
      getData();
   }, []);

   function addNote(e) {
      e.preventDefault();
      axios.post(baseURL, { title, description, ip }).then((response) => {
         if (!response.ok) {
            setTitle("");
            setDescription("");
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 2000);
         } else {
            console.log("failed to submit data");
         }
      });
   }
   // const addNote = async ( e ) => {
   //    e.preventDefault();
   //    try {
   //       const response = await fetch(baseURL, {
   //          method: "POST",
   //          headers: { "Content-Type": "application/json" },
   //          body: JSON.stringify({
   //             title,
   //             description,
   //          }),
   //       });

   //       if (response.ok) {
   //          setTitle("");
   //          setDescription("");
   //          setSubmitted(true);
   //          setTimeout(() => setSubmitted(false), 2000);
   //       } else {
   //          console.log("failed to submit data");
   //       }
   //    } catch (error) {
   //       console.log(error);
   //    }
   // };
   return (
      <div>
         <Link to="/" className="back-button">
            ◀️ Go Back
         </Link>
         <form onSubmit={addNote}>
            <div className="single-note">
               <div>
                  <input
                     type="text"
                     value={title}
                     onChange={(e) => setTitle(e.target.value)}
                     placeholder="Title"
                     className="title"
                  />
               </div>
               <textarea
                  value={description}
                  onChange={(e) => {
                     setDescription(e.target.value);
                  }}
                  placeholder="Description"
                  row="4"
                  cols="50"
                  className="description"
               ></textarea>
            </div>
            <input
               type="submit"
               value={submitted ? "Saving note." : "💾Save Note"}
               disabled={submitted}
            />
            <div className="text-center">
               {submitted && (
                  <p className="success-message">Note has been added</p>
               )}
            </div>
         </form>
      </div>
   );
}

export default AddNote;
