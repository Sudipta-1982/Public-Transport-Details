import experss, { response } from "express";
import axios from "axios";
import cors from "cors";


const app= experss();
const PORT= 3000;

app.use(cors());

const API_KEY= "58044dc0-8049-4584-ac77-0c5c522b9609";
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
            "Content-Type": "text/json",
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
