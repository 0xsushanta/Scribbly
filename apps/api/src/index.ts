import express from 'express'
import "dotenv/config"
import userRoutes from "./routes/user/user.routes"
const app= express()
const port=process.env.PORT
app.use(express.json())
app.use("/api/v1",userRoutes)
app.listen(port, ()=>{
    console.log(`server is running on ${port}`);
})