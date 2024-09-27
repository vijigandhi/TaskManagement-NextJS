'use client';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeMenu, setActiveMenu] = useState(""); // State for active menu

  useEffect(() => {
    setActiveMenu(location.pathname); // Set active menu based on current path
    fetch(process.env.NEXT_PUBLIC_API_URL + '/api/dashboard')
      .then((res) => res.json())
      .then((res) => {
        if (res.message === 'admin') {
          setIsAdmin(true);
          router.push('/taskmanager/adduser');
        } else if (!res.message === 'empty') {
          router.push('/login');
        } else {
          router.push('/taskmanager/homepage');
        }
      });
  }, []);

  // Function to handle menu navigation and set active state
  function handleNavigateAdmin() {
    setActiveMenu('/admin');
    router.push('/admin');
  }

  function handleNavigateHome() {
    setActiveMenu('/taskmanager/homepage');
    router.push('/taskmanager/homepage');
  }

  function handleNavigateAddUser() {
    setActiveMenu('/taskmanager/adduser');
    router.push('/taskmanager/adduser');
  }

  function handleNavigateAddTask() {
    setActiveMenu('/taskmanager/addtask');
    router.push('/taskmanager/addtask');
  }

  function handleLogout() {
    fetch(process.env.NEXT_PUBLIC_API_URL + '/api/logout').then((res) => res);
    router.push('/login');
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col justify-between">
        <div>
          <div className="p-6 text-center font-bold text-xl border-b border-gray-700">
            Dashboard
          </div>
          <div className="p-6 space-y-4">
            {isAdmin && (
              <>
                <button
                  onClick={handleNavigateAddUser}
                  className={`w-full text-left p-3 rounded ${
                    activeMenu === '/taskmanager/adduser'
                      ? 'bg-gray-700'
                      : 'hover:bg-gray-700'
                  }`}
                >
                  User List
                </button>
                <button
                  onClick={handleNavigateAddTask}
                  className={`w-full text-left p-3 rounded ${
                    activeMenu === '/taskmanager/addtask'
                      ? 'bg-gray-700'
                      : 'hover:bg-gray-700'
                  }`}
                >
                  Tasks
                </button>
              </>
            )}
            {!isAdmin && (
              <button
                onClick={handleNavigateHome}
                className={`w-full text-left p-3 rounded ${
                  activeMenu === '/taskmanager/homepage'
                    ? 'bg-gray-700'
                    : 'hover:bg-gray-700'
                }`}
              >
                Task Manager
              </button>
            )}
          </div>
        </div>
        <div className="p-6">
          <button
            onClick={handleLogout}
            className="w-full text-left p-3 hover:bg-red-600 rounded"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
