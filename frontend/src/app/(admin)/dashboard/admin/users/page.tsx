"use client";

import { useState } from "react";
import { PencilIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
}

const users: User[] = [
  {
    id: 1,
    name: "John Carter",
    email: "john@google.com",
    phone: "08485734834",
    location: "United States",
    avatar: "/Images/landing_1.png",
  },
  {
    id: 2,
    name: "Sophie Moore",
    email: "sophie@webflow.com",
    phone: "08398458328",
    location: "United Kingdom",
    avatar: "/Images/landing_2.png",
  },
];

const UserDashboard = () => {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [userList, setUserList] = useState<User[]>(users);

  const toggleSelect = (id: number) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  const editData = ({ id }: { id: number }) => {
    console.log(id);
  };

  const removeData = ({ id }: { id: number }) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmed) {
      setUserList((prev) => prev.filter((user) => user.id !== id));
      setSelectedUsers((prev) => prev.filter((uid) => uid !== id));
    }
  };

  return (
    <div className="bg-white text-gray-800 rounded-xl p-6 w-full shadow-md">
      <h2 className="text-xl font-semibold mb-6">All Users</h2>
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full table-auto text-sm text-left">
          <thead>
            <tr className="bg-gray-100 text-gray-600 border-b border-gray-300">
              <th className="py-3 px-4">
                <input type="checkbox" />
              </th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Phone</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => toggleSelect(user.id)}
                  />
                </td>
                <td className="px-4 py-4 flex items-center gap-4 whitespace-nowrap">
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    width={36}
                    height={36}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </td>
                <td className="px-4 py-4">{user.phone}</td>
                <td className="px-4 py-4">{user.location}</td>
                <td className="px-4 py-4 text-center">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => editData({ id: user.id })}
                      className="bg-transparent"
                    >
                      <PencilIcon className="size-5 text-gray-500 hover:text-blue-600 cursor-pointer transition" />
                    </button>
                    <button
                      onClick={() => removeData({ id: user.id })}
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
        1–{users.length} of {users.length}
      </div>
    </div>
  );
};

export default UserDashboard;
