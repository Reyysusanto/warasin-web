/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { PencilIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import AddUserPage from "./_components/createUser";
import { deleteUserService } from "@/services/dahsboardService/user/deleteUser";
import { useRouter } from "next/navigation";
import { GetAllUsers } from "@/services/dahsboardService/user/users";
import { UserList } from "@/types/user";

const UserDashboard = () => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [userList, setUserList] = useState<UserList[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await GetAllUsers();
        if (res && res.status === true) {
          setUserList(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  const toggleSelect = (id: string) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  const editData = (id: string) => {
    router.push(`/dashboard/admin/users/${id}`)
  };

  const removeData = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (!confirmed) return;
  
    try {
      const res = await deleteUserService(id);
  
      if (res.status === true) {
        setUserList((prev) => prev.filter((user) => user.user_id !== id));
        setSelectedUsers((prev) => prev.filter((uid) => uid !== id));
        alert("User deleted successfully");
      } else {
        alert(res.message || "Failed to delete user");
      }
    } catch (error: any) {
      alert(error || "Error occurred while deleting user");
    }
  };
  

  return (
    <div className="bg-white text-gray-800 flex flex-col rounded-xl p-6 gap-4 w-full shadow-md">
      <AddUserPage />
      <div className="overflow-x-auto rounded-lg">
        <h2 className="text-xl font-semibold mb-6">All Users</h2>
        <table className="min-w-full table-auto text-sm text-left">
          <thead>
            <tr className="bg-gray-100 text-gray-600 border-b border-gray-300">
              <th className="py-3 px-4">
                <input type="checkbox" />
              </th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">City</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user) => (
              <tr
                key={user.user_id}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.user_id)}
                    onChange={() => toggleSelect(user.user_id)}
                  />
                </td>
                <td className="px-4 py-4 flex items-center gap-4 whitespace-nowrap">
                  <Image
                    src="/Images/default_profile.png"
                    alt={user.user_name}
                    width={36}
                    height={36}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-medium">{user.user_name}</p>
                    <p className="text-xs text-gray-500">{user.user_email}</p>
                  </div>
                </td>
                <td className="px-4 py-4">{user.user_email}</td>
                <td className="px-4 py-4">
                  {user.city?.city_name || "Unknown"}
                </td>
                <td className="px-4 py-4 text-center">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => editData(user.user_id)}
                      className="bg-transparent"
                    >
                      <PencilIcon className="size-5 text-gray-500 hover:text-blue-600 cursor-pointer transition" />
                    </button>
                    <button
                      onClick={() => removeData(user.user_id)}
                      className="bg-transparent"
                    >
                      <Trash2Icon className="size-5 text-gray-500 hover:text-red-500 cursor-pointer transition" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-sm text-gray-500 mt-4 text-right">
        1–{userList.length} of {userList.length}
      </div>
    </div>
  );
};

export default UserDashboard;
