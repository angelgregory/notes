import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
function Note() {
   const { id } = useParams();
   const baseURL = `${import.meta.env.VITE_SERVER_URL}/api/notes/${id}`;
   const [description, setDescription] = useState("");
   const [title, setTitle] = useState("");
   const [serverIp, setServerIp] = useState("");
   const [ip, setIp] = useState("");
   const [sameUser, setSameUser] = useState(false);
   const [submitted, setSubmitted] = useState(false);
   const [isLoading, setIsLoading] = useState(true);
   const navigate = useNavigate();
   // console.log(id);

   useEffect(() => {
      axios
         .get(baseURL)
         .then((res) => {
            // console.log(res);
            setTitle(res.data.title);
            setDescription(res.data.description);
            setServerIp(res.data.ip);
            setIsLoading(false);
         })
         .catch((err) => {
            console.log(err);
            setIsLoading(false);
         });
      axios.get("https://api.ipify.org/?format=json").then((res) => {
         setIp(res.data.ip);
      });
   }, []);

   useEffect(() => {
      // do something

      if (ip === serverIp) {
         setSameUser(true);
      } else {
         setSameUser(false);
      }
      console.log(sameUser);
   }, [ip]);

   // console.log("serverip", serverIp);
   // console.log("ip", ip);
   function note(e) {
      e.preventDefault();
      axios.put(baseURL, { title, description }).then((response) => {
         if (response) {
            setTitle("");
            setDescription("");
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 2000);
         }
      });
   }

   function removeNote() {
      axios.delete(baseURL).then((response) => {
         if (response) {
            navigate("/");
         }
      });
   }

   // useEffect(() => {
   //    const fetchData = async () => {
   //       try {
   //          const response = await fetch(baseURL);
   //          if (!response.ok) {
   //             throw new Error("failed to fetch data");
   //          }
   //          const data = await response.json();
   //          setTitle(data.title);
   //          setDescription(data.description);
   //          // setIsLoading(false);
   //       } catch (error) {
   //          // setError("error fetching data");
   //          // setIsLoading(false);
   //       }
   //    };
   //    fetchData();
   // }, []);

   // const note = async (e) => {
   //    e.preventDefault();
   //    try {
   //       const response = await fetch(baseURL, {
   //          method: "PUT",
   //          headers: { "Content-Type": "application/json" },
   //          body: JSON.stringify({
   //             title,
   //             description,
   //          }),
   //       });

   //       if (response.ok) {
   //          // setTitle("");
   //          // setDescription("");
   //          setSubmitted(true);
   //          setTimeout(() => setSubmitted(false), 2000);
   //       } else {
   //          console.log("failed to submit data");
   //       }
   //    } catch (error) {
   //       console.log(error);
   //    }
   // };

   // const removeNote = async (e) => {
   //    e.preventDefault();
   //    try {
   //       const response = await fetch(baseURL, {
   //          method: "DELETE",
   //       });
   //       if (response.ok) {
   //          navigate("/");
   //       }
   //    } catch (error) {}
   // };
   return (
      <div>
         <div className="breadcrump-nav">
            <Link to="/" className="back-button">
               ◀️ Go Back
            </Link>

            <button
               onClick={removeNote}
               className="delete removed-note"
               hidden={!sameUser}
            >
               🗑️Delete Note
            </button>
         </div>

         <form onSubmit={note}>
            <div className="single-note">
               <div>
                  <input
                     type="text"
                     value={title}
                     onChange={(e) => setTitle(e.target.value)}
                     placeholder="Title"
                     className="title"
                     disabled={!sameUser}
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
                  disabled={!sameUser}
               ></textarea>
            </div>

            <input
               type="submit"
               value={submitted ? "Saving note." : "💾Save Note"}
               disabled={submitted}
               hidden={!sameUser}
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

export default Note;
