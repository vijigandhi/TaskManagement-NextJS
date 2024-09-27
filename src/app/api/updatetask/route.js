import TaskModel from '@/models/tasks';
import connectMongo from '@/utils/connectMongo';
import { cookies } from 'next/headers';


export async function GET(){
  const cookieStore = cookies(); 
  const user = cookieStore.get('username'); 
  console.log("usernew",user.value);
    await connectMongo()
    let updatedTask  =await TaskModel.find( { username: user.value })
    return Response.json({updates:updatedTask})
}
 
export async function POST(req){
  const cookieStore = cookies(); 
  const user = cookieStore.get('username'); 

    try{
      const {id,status}=await req.json()
      const data = {id,status}
      console.log("udata",data);
      
       await connectMongo()
       const taskupdate = await TaskModel.updateOne(
        { _id: id },
        { $set: { status: status } } 
    )
         let updatedTask  =await TaskModel.find( { username: user.value })
         return Response.json({updates:updatedTask,message:"Updated "})
    }catch{
      return Response.json({message:"Already up to date "})
    }
  
}