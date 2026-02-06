const app = require("./src/app");
const connectToDB = require("./src/config/dataBase");


connectToDB();


app.listen(3000 , ()=>{
    console.log("server is running on port 3000");
});