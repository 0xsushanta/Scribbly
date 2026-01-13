import WebSocket, { WebSocketServer } from "ws";
import jwt from "jsonwebtoken"
import {prisma} from "@repo/database"
import { JWT_SECRET } from "@repo/backend-common"
const wss= new WebSocketServer({port:8080})
interface User{
  room: string[],
  userId: string,
  ws: WebSocket
}
const users: User[]=[]
function verifyUser(token: string):string|null{
  try {
    const decoded= jwt.verify(token, JWT_SECRET)
    if(typeof decoded== "string"){
      return null
    }
    return decoded.userId
  } catch (error) {
    console.log(error);
    return null
  }
}
wss.on("connection", (ws, request)=>{
  const url= request.url
  const queryParmas= new URLSearchParams(url?.split("?")[1])
  const token= queryParmas.get("token")
  if(!token){
    return
  }
  const userId= verifyUser(token)
  if(!userId){
    ws.close()
    return
  }
  users.push({
    userId,
    room:[],
    ws
  })
  ws.on("message", async function message(data){
    const parseData= JSON.parse(data.toString())
    if(parseData.type=== "join_room"){
      const user= users.find(x=>x.ws=== ws)
      user?.room.push(parseData.roomId)
    }
    if(parseData.type==="leave_room"){
      const user= users.find(x=>x.ws===ws)
      if(!user){
        return
      }
      user.room=user?.room.filter(x=>x===parseData.roomId)
    }
    if(parseData.type=== "chat"){
      const room= parseData.roomId
      const message= parseData.message
      await prisma.chat.create({
        data:{
          message,
          roomId:Number(room),
          userId
        }
      })
      users.forEach(users=>{
        if(users.room.includes(room)){
          users.ws.send(JSON.stringify({
            type:"chat",
            message:message,
            roomId:parseData.roomId
          }))
        }
      })
    }
  })
})