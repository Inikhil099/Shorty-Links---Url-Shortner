import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { backend_url } from "../constants";

function Home() {
  const [url, seturl] = useState("");
  const [AllUrls, setAllUrls] = useState([]);

  const handleGetAllUrls = async () => {
    try {
      const res = await axios.get(`${backend_url}/url/allurls`, {
        withCredentials: true,
      });
      setAllUrls(res.data.allurls);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGenerateUrl = async () => {
    try {
      const cleanUrl = url.replace(/^(https?:\/\/)+/, '')
      const res = await axios.post(
        `${backend_url}/url`,
        { Url: `https://${cleanUrl}`},
        { withCredentials: true }
      );
      if (res.status == 200 && res.data.generatedUrl) {
        setAllUrls((prevUrls) => [...prevUrls, res.data.generatedUrl]);
        seturl("")
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetAllUrls();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-[#0d1117] text-white px-6 py-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-2 text-pink-500">
            ShortY Link :)
          </h2>
          <p className="text-gray-400 mb-6">
            ShortY Links is an effiecient and easy to use URL shortening service
            that streamlines your online experience
          </p>

          <div className="max-w-2xl mx-auto flex gap-2 mb-4">
            <input
            value={url}
              type="text"
              onChange={(e) => {
                seturl(e.target.value);
              }}
              placeholder="example.com"
              className="flex-1 bg-gray-800 border border-gray-600 rounded px-4 py-2 text-white"
            />
            <button
              onClick={(e) => {
                handleGenerateUrl();
              }}
              className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
            >
              Shorten URL
            </button>
          </div>
        </div>

        <div className="mt-12">
          <div className="bg-[#161b22] rounded-lg overflow-x-auto">
            <table className="w-full text-center">
              <thead>
                <tr className="text-white border-b border-gray-700">
                  <th className="py-3 px-4">S.No</th>

                  <th className="py-3 px-4">Original URL</th>

                  <th className="py-3 px-4">Short URL</th>

                  <th className="py-3 px-4">Visits</th>

                  <th className="py-3 px-4">Date</th>

                  <th className="py-3 px-4">Go to URL</th>
                </tr>
              </thead>
              <tbody>
                {AllUrls.length > 0
                  ? AllUrls.map((e, i) => (
                      <tr key={i} className="hover:bg-gray-800">
                        <td className="py-3 px-4">{i + 1}</td>

                        <td className="py-3 px-4 truncate max-w-[200px]">
                          {e.redirectUrl}
                        </td>

                        <td className="py-3 px-4">{e.shortId}</td>

                        <td className="py-3 px-4">{e.visitHistory.length}</td>

                        <td className="py-3 px-4">{new Date(e.createdAt).toLocaleDateString('en-GB')}</td>

                        <td className="py-3 px-4">
                          <Link
                            to={`http://localhost:3000/url/goto/${e.shortId}`}
                            className="text-green-400 cursor-pointer hover:underline"
                          >
                            Go to URL
                          </Link>
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
