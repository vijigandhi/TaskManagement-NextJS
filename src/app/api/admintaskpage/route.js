import connectMongo from "@/utils/connectMongo";
import TaskModel from "@/models/tasks";

export async function GET(){
   await connectMongo()
   const Totaltask = await TaskModel.find()
   return Response.json({message:Totaltask})
}

export async function POST(req){
    
    const {username,task,description,status}= await req.json();
    const data = {username,task,description,status}
    console.log(data);
    await connectMongo()
    const Update = await TaskModel.create(data)
    const Totaltask  = await TaskModel.find()
    return Response.json({message:'posted',totlalTask:Totaltask})
    
}
