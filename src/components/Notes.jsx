import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Notes = () => {
   const baseURL = `${import.meta.env.VITE_SERVER_URL}/api/notes`;
   // console.log(import.meta.env.VITE_SERVER_URL);

   const [data, setData] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      axios
         .get(baseURL)
         .then((res) => {
            setData(res.data);
            setIsLoading(false);
         })
         .catch((err) => {
            setError("error fetching data");
            setIsLoading(false);
         });
   }, []);
   // useEffect(() => {
   //    const fetchData = async () => {
   //       try {
   //          const response = await fetch(baseURL);
   //          if (!response.ok) {
   //             throw new Error("failed to fetch data");
   //          }
   //          const data = await response.json();
   //          setData(data);
   //          setIsLoading(false);
   //       } catch (error) {
   //          setError("error fetching data");
   //          setIsLoading(false);
   //       }
   //    };
   //    fetchData();
   // }, []);

   return (
      <div>
         {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
         {isLoading ? (
            <p>Loading...</p>
         ) : error ? (
            <p>{error}</p>
         ) : (
            <ul className="notes">
               <li className="add-note-button">
                  <Link to={`/AddNote`}>
                     <div className="plus">+</div>
                  </Link>
               </li>
               {data.map((item) => (
                  <li key={item._id} className="notes-1">
                     <Link to={`/note/${item._id}`}>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                     </Link>
                  </li>
               ))}
            </ul>
         )}
      </div>
   );
};

export default Notes;
