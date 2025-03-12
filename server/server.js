import express, { response } from "express";
import axios from "axios";
import cors from "cors";


const app= express();
const PORT= 3000;

app.use(cors());

const API_KEY= "4581b803513643bd987a303e7049d864";
const API_URL= "https://api.trafikinfo.trafikverket.se/v2/data.json";

const jsonData=`
<REQUEST>
  <LOGIN authenticationkey="${API_KEY}" />
  <QUERY objecttype="Situation" schemaversion="1" limit="10">
  <FILTER>
    <NEAR name="Deviation.Geometry.WGS84" value="12.413973 56.024823" />
    <GT name="Deviation.CreationTime" value="2024-10-23T10:27:24.717+02:00"/>
  </FILTER>
  </QUERY>
</REQUEST>
`;

app.get("/fetch-data", (req, res) =>{
    axios
    .post(API_URL, jsonData,{
        headers:{
            "Content-Type": "text/xml",
        },
    })
.then((response) =>{
    console.log("Received response:",response.data);
    res.json(response.data);
})

.catch((error) =>{
    console.error("Request failed:", error);
    res.status(500).send("Failed to fetch data");
});
});

app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
});
