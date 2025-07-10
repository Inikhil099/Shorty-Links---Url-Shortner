import React, { useEffect, useState } from 'react'
import axiox from "axios"

function Home() {

  const [url, seturl] = useState("")
  const [AllUrls, setAllUrls] = useState([])

  const handleAllUrls = async () => {

  }

  const handleGenerateUrl = async () => {
    try {
      const res = await axiox.post("http://localhost:3000/url", { Url: `https://${url}` }, { withCredentials: true })
      console.log(res.data.generatedUrl.redirectUrl)
      if(res.data.generatedUrl.redirectUrl){
        AllUrls.push(res.data.generatedUrl.redirectUrl)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // useEffect(() => {

  // }, [])

  return (
    <>
      <div className="min-h-screen bg-[#0d1117] text-white px-6 py-8">
        {/* <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">Linky</h1>
        <div className="flex gap-2">
          <button className="text-white border border-gray-500 px-4 py-2 rounded">Login</button>
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">Register Now</button>
        </div>
      </header> */}


        <main className="text-center">
          <h2 className="text-4xl font-bold mb-2 text-pink-500">
            ShortY Link :)
          </h2>
          <p className="text-gray-400 mb-6">
            ShortY Links is an effiecient and easy to use URL shortening service that streamlines your online experience
          </p>

          <div className="max-w-2xl mx-auto flex gap-2 mb-4">
            <input
              type="text"
              onChange={(e) => {
                seturl(e.target.value)
              }}
              placeholder="example.com"
              className="flex-1 bg-gray-800 border border-gray-600 rounded px-4 py-2 text-white"
            />
            <button onClick={(e) => { handleGenerateUrl() }} className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded">Shorten URL</button>
          </div>


        </main>

        <section className="mt-12">
          <div className="bg-[#161b22] rounded-lg overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-400 border-b border-gray-700">
                  <th className="py-3 px-4">Original URL</th>
                  <th className="py-3 px-4">Short URL</th>
                  <th className="py-3 px-4">Visits</th>
                  <th className="py-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(5)].map((_, i) => (
                  <tr key={i} className="hover:bg-gray-800">
                    <td className="py-3 px-4 truncate max-w-[200px]">
                      https://example.com/this-is-a-very-long-url-to-shorten
                    </td>
                    <td className="py-3 px-4">
                      <a href="#" className="text-blue-400 hover:underline">linky.io/abcd{i}</a>
                    </td>
                    <td className="py-3 px-4">123</td>
                    <td className="py-3 px-4">2025-07-07</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  )
}

export default Home

