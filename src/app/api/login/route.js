import UserModel from "@/models/users";
import connectMongo from "@/utils/connectMongo" 

import { cookies } from "next/headers";
export async function POST(req){

    const data = await req.json()
    const email= data.email
    const password = data.password
    console.log('email',email,"password",password);
    
    await connectMongo()
    const user = await UserModel.findOne({email:email,password:password})
    console.log("User",user);

    if(user==null){
        return Response.json({message:"Passsword and email not match "})
    }
    if(user.username=='admin'){
        cookies().set('username','admin')
        return Response.json({message:'Admin logged in sucessfully'})
    }else {
        cookies().set('username',user.username)
        return Response.json({message:'logged in Sucessfully'})
    }
    
    }


