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
      <h1 className="text-center text-3xl">User Details</h1>
      <div className="overflow-x-auto mt-10">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Hart Hagerty</div>
                    <div className="text-sm opacity-50">United States</div>
                  </div>
                </div>
              </td>
              <td>
                Zemlak, Daniel and Leannon
                <br />
                <span className="badge badge-ghost badge-sm">
                  Desktop Support Technician
                </span>
              </td>
              <td>Purple</td>
              <th>
                <button className="btn btn-ghost btn-xs">details</button>
              </th>
            </tr>
            
          </tbody>
        </table>
      </div>
    </>
  );
};

export default User;
