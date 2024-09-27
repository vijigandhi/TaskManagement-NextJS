"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:3000/api/login", {
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((res) => {
        setMessage(res.message);
        setIsSuccess(res.message.search("logged") !== -1);

        setTimeout(() => {
          if (res.message.search("logged") !== -1) {
            router.push("/taskmanager/adduser");
          }
          setMessage("");
        }, 3000);
      });
  }

  function handleChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded shadow-md">
        <h3 className="mb-6 text-2xl font-bold text-center text-gray-800">
          Login to Continue
        </h3>
        <form onSubmit={handleSubmit} method="POST">
          <div className="mb-4">
            <input
              onChange={handleChange}
              name="email"
              type="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <input
              onChange={handleChange}
              name="password"
              type="password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Login
          </button>
        </form>
        {message && (
          <p
            className={`mt-4 text-center ${
              isSuccess ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
