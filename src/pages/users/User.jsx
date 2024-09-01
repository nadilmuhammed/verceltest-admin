import React from "react";

const User = () => {
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      image: "https://via.placeholder.com/50",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      image: "https://via.placeholder.com/50",
    },
    // Add more users here
  ];

  return (
    <>
      <h1>User Details</h1>
    <div className="flex justify-center">
      <div className="overflow-x-auto w-full">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium text-gray-700">User</th>
              <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium text-gray-700">Email</th>
              <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 border-b border-gray-300 flex items-center">
                  <img
                    className="h-10 w-10 rounded-full mr-3"
                    src={user.image}
                    alt={`${user.name}'s profile`}
                  />
                  <span className="text-sm text-gray-800">{user.name}</span>
                </td>
                <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-800">
                  {user.email}
                </td>
                <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-800">
                  <button className="text-blue-500 hover:underline">Edit</button>
                  <button className="ml-4 text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default User;
