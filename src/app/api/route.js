import connectMongo from "@/utils/connectMongo" 
import UserModel from "@/models/users"


export async function GET() {
    try{
        await connectMongo()
        let users =await UserModel.find()
        return Response.json({message:users})
       }catch(e){
        return Response.json({message:e.message})
       }
}


export async function POST(req){
    try{
    const  {username,email,password} = await req.json()
    const signDetails =  {username,email,password}
    await connectMongo()
    await UserModel.create(signDetails)
    const users =await UserModel.find({username:{$ne:'admin'}})
    return Response.json({message:'User Added',users:users})
    }catch(error){
        return Response.json({message:error.message})
    }
}