"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function CreateUser() {
  const router = useRouter();
  const [inputs, setInputs] = useState({});
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Handle form inputs
  const handleInputs = (e) => {
    setInputs((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  // Fetch users list
  useEffect(() => {
    fetch("http://localhost:3000/api/adminpage")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
      });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    })
      .then((res) => res.json())
      .then((res) => {
        setMessage(res.message);
        setInputs({});
        setUsers(res.users);

        setTimeout(() => {
          setMessage("");
          setShowModal(false);
        }, 3000);
      })
      .catch((error) => {
        setMessage("Error: " + error.message);
      });
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <button
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        onClick={() => setShowModal(true)}
      >
        Add New User
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg relative w-full max-w-md mx-2 md:w-96">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold mb-4 text-center">Add New User</h3>
            <form method="POST" onSubmit={submitHandler} className="space-y-4">
              <div>
                <input
                  className="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                  onChange={handleInputs}
                  name="username"
                  type="text"
                  value={inputs.username ?? ""}
                  placeholder="Name"
                  required
                />
              </div>
              <div>
                <input
                  className="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                  onChange={handleInputs}
                  name="email"
                  type="email"
                  value={inputs.email ?? ""}
                  placeholder="Email"
                  required
                />
              </div>
              <div>
                <input
                  onChange={handleInputs}
                  name="password"
                  className="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                  type="password"
                  value={inputs.password ?? ""}
                  placeholder="Password"
                  required
                />
              </div>
              <button
                className="bg-blue-600 text-white py-2 px-4 rounded w-full hover:bg-blue-700 transition"
                type="submit"
              >
                Create User
              </button>
            </form>
            {message && (
              <div className="mt-4">
                <p className="text-center text-sm text-green-600">{message}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* User List */}
      <div className="w-full max-w-4xl mt-10 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4">User List</h3>
        <table className="table-auto w-full border-collapse border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr className="text-gray-700 text-left text-sm uppercase">
              <th className="py-3 px-6 border-b">User Name</th>
              <th className="py-3 px-6 border-b">Email</th>
              <th className="py-3 px-6 border-b">Password</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-gray-50 transition duration-200"
              >
                <td className="py-4 px-6 border-b">{user.username}</td>
                <td className="py-4 px-6 border-b">{user.email}</td>
                <td className="py-4 px-6 border-b">{user.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
