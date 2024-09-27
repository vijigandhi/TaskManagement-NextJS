"use client";
import { useEffect, useState } from "react";

export default function TaskManager() {
  const [taskData, setTaskData] = useState({ status: "pending" });
  const [notification, setNotification] = useState("");
  const [userList, setUserList] = useState([]);
  const [taskList, setTaskList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Handle input change
  const handleInputChange = (e) => {
    setTaskData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Submit task form
  const handleTaskSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/api/admintaskpage", {
      method: "POST",
      body: JSON.stringify(taskData),
    })
      .then((res) => res.json())
      .then((res) => {
        setNotification(res.message);
        setTaskList(res.totlalTask);
        setTimeout(() => {
          setNotification("");
          setIsModalVisible(false);
        }, 3000);
      });
  };

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/adminpage"
      );
      const data = await res.json();
      if (data && data.tasks) {
        setTaskList(data.tasks);
        setUserList(data.users);
      }
    };
    fetchData();
  }, []);

  // Open and close modal functions
  const showTaskModal = () => setIsModalVisible(true);
  const hideTaskModal = () => setIsModalVisible(false);

  return (
    <>
      {/* Add Task Button */}
      <button
        onClick={showTaskModal}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Assign New Task
      </button>

      {/* Modal for Adding Task */}
      {isModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded shadow-lg w-1/2 relative">
            {/* Close Button */}
            <button
              onClick={hideTaskModal}
              className="text-gray-500 absolute top-3 right-3 text-lg font-bold"
            >
              &times;
            </button>

            {/* Task Form */}
            <form onSubmit={handleTaskSubmit} className="text-center p-3">
              <h3 className="font-bold my-10 text-lg">Add New Task</h3>

              <div className="mb-5">
                <select
                  name="username"
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                >
                  <option>Select User</option>
                  {userList.map((user) => (
                    <option key={user._id} value={user.username}>
                      {user.username}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-5">
                <input
                  className="border w-full p-2 rounded"
                  name="task"
                  placeholder="Task Title"
                  onChange={handleInputChange}
                  type="text"
                />
              </div>

              <div className="w-full mb-5">
                <textarea
                  className="border w-full p-2 rounded"
                  name="description"
                  onChange={handleInputChange}
                  placeholder="Task Description"
                ></textarea>
              </div>

              <div className="w-full mb-5">
                <select
                  name="status"
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
              >
                Add Task
              </button>

              {/* Notification Message */}
              {notification && (
                <div className="mt-4 text-green-600 font-semibold">
                  {notification}
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Task List Table */}
      <div className="w-full max-w-6xl mt-10 bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">Task List</h3>
      <table className="min-w-full bg-white shadow rounded-lg overflow-hidden mt-5">
      <thead className="bg-gray-200">
      <tr className="text-left text-gray-600 uppercase text-sm">
      <th className="py-4 px-6 border-b border-gray-300">User Name</th>
      <th className="py-4 px-6 border-b border-gray-300">Task</th>
      <th className="py-4 px-6 border-b border-gray-300">Description</th>
      <th className="py-4 px-6 border-b border-gray-300">Status</th>
    </tr>
  </thead>
  <tbody>
    {taskList.map((task) => (
      <tr
        key={task.id}
        className="hover:bg-gray-100 transition duration-200 ease-in-out odd:bg-white even:bg-gray-50"
      >
        <td className="py-4 px-6 border-b border-gray-300">{task.username}</td>
        <td className="py-4 px-6 border-b border-gray-300">{task.task}</td>
        <td className="py-4 px-6 border-b border-gray-300">
          {task.description}
        </td>
        <td
          className={`py-4 px-6 border-b border-gray-300 font-semibold ${
            task.status === "pending"
              ? "text-orange-600"
              : task.status === "in-progress"
              ? "text-yellow-600"
              : "text-green-600"
          }`}
        >
          {task.status}
        </td>
      </tr>
    ))}
  </tbody>
</table>
</div>

    </>
  );
}
