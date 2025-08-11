import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Admin() {
  const [url, setUrl] = useState("");
  const [adminUrls, setAdminUrls] = useState([]);
  const [allUrls, setAllUrls] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const getDataForAdmin = async () => {
      const res = await axios.get("http://localhost:3000/admin");
      if (res.status == 200) {
        setAllUsers(res.data.details.AllUsers);
        setAllUrls(res.data.details.AllUrls);
      }
    };
    getDataForAdmin();
  }, []);

  return (
    <div className="min-h-screen bg-[#0d1117] text-white px-6 py-8">
      <h2 className="text-4xl font-bold mb-6 text-center text-blue-500">
        Admin Dashboard
      </h2>

      {/* Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-center">
        <div className="bg-[#161b22] p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-400 mb-2">
            Total Users
          </h3>
          <p className="text-2xl font-bold text-white">{allUsers.length}</p>
        </div>

        <div className="bg-[#161b22] p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-400 mb-2">
            Total URLs
          </h3>
          <p className="text-2xl font-bold text-white">{allUrls.length}</p>
        </div>
      </div>

      {/* Users Table */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-purple-400 mb-4">All Users</h3>
        <div className="bg-[#161b22] rounded-lg overflow-x-auto">
          <table className="w-full text-center">
            <thead>
              <tr className="text-white border-b border-gray-700">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Total Urls Created</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Joined</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((user,index) => (
                <tr key={index} className="hover:bg-gray-800">
                  <td className="py-3 px-4">{user.firstname} {user.lastname}</td>
                  <td className="py-3 px-4">{allUrls.filter(x => x.createdBy.firstname === user.firstname).length}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* All URLs Table */}
      <div>
        <h3 className="text-2xl font-bold text-yellow-400 mb-4">All URLs</h3>
        <div className="bg-[#161b22] rounded-lg overflow-x-auto">
          <table className="w-full text-center">
            <thead>
              <tr className="text-white border-b border-gray-700">
                <th className="py-3 px-4">Short ID</th>
                <th className="py-3 px-4">Original URL</th>
                <th className="py-3 px-4">Created By</th>
                <th className="py-3 px-4">Visits</th>
                <th className="py-3 px-4">Created At</th>
                <th className="py-3 px-4">Go to URL</th>
              </tr>
            </thead>
            <tbody>
              {allUrls.map((url, i) => (
                <tr key={i} className="hover:bg-gray-800">
                  <td className="py-3 px-4">{url.shortId}</td>
                  <td className="py-3 px-4 truncate max-w-[250px]">
                    {url.redirectUrl}
                  </td>
                  <td className="py-3 px-4">{url.createdBy.firstname} {url.createdBy.lastname}</td>
                  <td className="py-3 px-4">{url.visitHistory.length}</td>
                  <td className="py-3 px-4">
                    {new Date(url.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <Link
                      to={`http://localhost:3000/url/goto/${url.shortId}`}
                      className="text-green-400 hover:underline"
                    >
                      Visit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Admin;
