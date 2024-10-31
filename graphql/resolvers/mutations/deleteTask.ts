import { Task } from "@/graphql/models";

export const deleteTask = async (
  _: unknown,
  { taskId, taskName }: { taskId: string; taskName: string }
) => {
    console.log(taskId ,taskName);
    
  try {
    // if (!taskId || !taskName) {
    //   throw new Error("Required taskId or taskName");
    // }

    const deleteTask = await Task.find({
      $or: [{ taskName: taskName }, { _id: taskId }],
    });

    if (deleteTask.length === 0) {
      throw new Error("Task not found");
    }
    
    if (!deleteTask[0].isDone) {
      throw new Error("Task is not complate");
    }
    const findDelete = await Task.findByIdAndDelete(deleteTask[0]._id);

    return findDelete;
  } catch (error) {
    throw new Error(`Failed delete Task: ${error.message}`);
  }
};
