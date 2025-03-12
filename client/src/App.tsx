import React, { useState } from 'react';
import axios from "axios";
import './App.css';


function App() {
  const [log, setLog]= useState<string>("");
  const fetchTrafficData = async() =>{
    try{
      const response= await axios.get("http://localhost:3000/fetch-data");
      setLog(JSON.stringify(response.data, null, 2));
      console.log("Data fetched successfully:", response.data);
      } catch(error: any){
        if(error.response){
          setLog(
            `Error: ${error.response.data}, Status code: ${error.response.ststus}`
          );
          console.error("Response error:", error.response);
        } else if(error.request){
          setLog("Error: No response received from the server");
          console.error("Request error:", error.request);
        } else{
          setLog(`Error: ${error.message}`);
          console.error("Error:", error.message);
        }

      }
  };

  return (
    <div style={styles.container}>
    <h1>Fetch Traffic Data</h1>
    <button onClick={fetchTrafficData} style={styles.button}>
      Fetch Data
    </button>
    <div id ="log" style={styles.log}>
      <pre>{log}</pre>
    </div>
    </div>
  );
};

const styles:{[key:string]: React.CSSProperties}={
  container:{
    fontFamily:"Arial, sans-serif",
    margin:"20px",
    textAlign:"center"
  },
  button:{
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",

  },
  log:{
    marginTop: "20px",
    padding: "10px",
    backgroundColor: "#f4f4f4",
    borderRadius: "5px",
    textAlign: "left",
    whiteSpace: "pre-wrap",
    
  }
}


export default App
