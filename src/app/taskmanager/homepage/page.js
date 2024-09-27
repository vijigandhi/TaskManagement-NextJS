"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function TaskManager() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [id, setId] = useState("");
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/updatetask"
      );
      const data = await res.json();

      if (data && data.updates) {
        setTasks(data.updates);
      }
    };
    fetchData();
  }, []);

  const openAlert = (message) => {
    Swal.fire({
      title: "Status Updated",
      text: message,
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  const openModal = () => {
    console.log("id", id, "status", status);

    const fetchData = async () => {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/updatetask",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id, status: status }),
        }
      );
      const data = await res.json();
      console.log("Response", data);
      openAlert(data.message);
      if (data.updates) {
        setTasks(data.updates);
      }
    };
    fetchData();
  };

  const statusChange = (e, id) => {
    setId(id);
    setStatus(e.target.value);
  };

  return (
    <>
      {/* Task Table */}
      <table className="table-auto w-full border-collapse border border-gray-200 shadow-lg mt-5 bg-white rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
            <th className="py-3 px-6 border-b">User Name</th>
            <th className="py-3 px-6 border-b">Task</th>
            <th className="py-3 px-6 border-b">Description</th>
            <th className="py-3 px-6 border-b">Status</th>
            <th className="py-3 px-6 border-b">Edit Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr
              key={task._id}
              className="hover:bg-gray-50 transition duration-200"
            >
              <td className="py-4 px-6 border-b">{task.username}</td>
              <td className="py-4 px-6 border-b">{task.task}</td>
              <td className="py-4 px-6 border-b">{task.description}</td>
              <td className="py-4 px-6 border-b text-yellow-600 font-semibold">
                {task.status}
              </td>
              <td className="py-4 px-6 border-b">
                <div className="flex items-center">
                  <select
                    name="status"
                    onChange={(e) => statusChange(e, task._id)}
                    className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option>pending</option>
                    <option>in-progress</option>
                    <option>completed</option>
                  </select>
                  <button
                    onClick={openModal}
                    className="bg-blue-500 hover:bg-blue-600 text-white rounded ml-2 p-2 transition"
                  >
                    Update
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
