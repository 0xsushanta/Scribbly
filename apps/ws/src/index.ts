import { WebSocket, WebSocketServer } from "ws";
const wss= new WebSocketServer({port:8080})
import jwt from "jsonwebtoken"
import {JWT_SECRET} from '@repo/backend-common'
interface User{
  userId: string,
  rooms: string[],
  ws: WebSocket
}
const users: User[]=[]
function verifyUser(token:string): string| null{
  try {
    const decoded= jwt.verify(token, JWT_SECRET)
    if(typeof decoded=== "string"){
      return null
    }
    return decoded.userId
  } catch (error) {
    return null
  }
}
wss.on('connection',( ws, request)=>{
  const url=request.url
  if(!url){
    return
  }
  const queryParamas= new URLSearchParams(url.split('?')[1])
  const token= queryParamas.get("token")
  console.log(token);
  if(!token){
    return
  }
  const userId= verifyUser(token)
  if(!userId){
    ws.close()
    return
  }
  ws.on('message', function message(data){
    const parsedData= JSON.parse(data.toString())
    if(parsedData=== "join_room"){
      const user= users.find(x=>x.ws=== parsedData.roomId)
      user?.rooms.push(parsedData.roomId)
    }
    if(parsedData=== "leave_room"){
      const user= users.find(x=>x.ws===parsedData.roomId)
      if(!user){
        return
      }
      user.rooms= user?.rooms.filter(x=>x=== parsedData.roomId)
    }
  })
})