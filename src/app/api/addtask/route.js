import connectMongo from "@/utils/connectMongo";
import TaskModel from "@/models/tasks";
import { cookies } from "next/headers";

export async function GET(){
    const cookie =  cookies().get('username')
    const username =  cookie.value
    await connectMongo()
    let userTask =  await TaskModel.find({username:username})
    return Response.json({message:userTask})

}


