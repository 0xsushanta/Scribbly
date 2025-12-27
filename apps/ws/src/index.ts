import {WebSocketServer} from "ws"
import jwt from "jsonwebtoken"
import {JWT_SECRET} from "@repo/backend-common"
const wss= new WebSocketServer({port:8080})
function checkUser(token:string):string|null{
    const decoded= jwt.verify(token,JWT_SECRET)
     if(typeof decoded== "string"){
        return null
    }
    if(!decoded.userId){

        return null
    }
    return decoded.userId
}
wss.on("connection", (ws, request)=>{
    const url=request.url
    if(!url){
        ws.send(JSON.stringify({
            type:"error",
            msg:"Invalid url"
        }))
        ws.close(1008,"Invalid url")
        return
    }
    const queryParams=new URLSearchParams(url.split('?')[1])
    const token=queryParams.get('token')
    if(!token){
        return
    }
    const userId= checkUser(token)
    if(!userId){
        ws.close()
    }
    
})