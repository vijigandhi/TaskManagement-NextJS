import TaskModel from "@/models/tasks";
import UserModel from "@/models/users";
import connectMongo from "@/utils/connectMongo" 

export async function GET(){
      await connectMongo()
      const Users = await UserModel.find({username:{$ne:'admin'}})
      const Tasks = await TaskModel.find()
      return Response.json({users:Users,tasks:Tasks})
}