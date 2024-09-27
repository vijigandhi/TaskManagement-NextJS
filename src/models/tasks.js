
import mongoose, { Schema,model,models } from "mongoose"

const taskSchema = new Schema({
    username:{ type: String, required: true },
    task:{ type: String, required: true },
    description:{type: String },
    status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
})


const TaskModel =models.tasks || model('tasks',taskSchema)
export default TaskModel

