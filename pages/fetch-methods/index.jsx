import { useState, useEffect } from "react";
import Link from "next/link";

const Index = () => {
  let [userData, setuserData] = useState([]);
  let [newUserId, setNewUserId] = useState(0);
  let [newTitle, setNewTitle] = useState("");
  let [newBody, setNewBody] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setuserData(data));
  }, []);
  console.log("users Data", userData);
  const addUser = () => {
    const userId = newUserId.trim();
    const title = newTitle.trim();
    const body = newBody.trim();
    if (userId && title && body) {
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify({
          userId,
          title,
          body,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setuserData([...userData, data]);
          setNewUserId("");
          setNewTitle("");
          setNewBody("");
          alert("Data Added Successfully!")
        });
    }
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center p-10">
        <h2 className="font-bold text-2xl">Fetch API GET Method</h2>

        <table className="w-3/4  p-2">
          <thead className="border-b py-3">
            <tr className="border-b font-bold">
              <td className="py-2">ID</td>
              <td>User Id</td>
              <td>title</td>
              <td>Body</td>
              <td className="text-center">Actions</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>
                <input
                  className="border rounded-lg text-sm px-1 py-2 w-full"
                  type="number"
                  value={newUserId}
                  onChange={(e) => setNewUserId(e.target.value)}
                  placeholder="Enter User Id"
                />
              </td>
              <td>
                <input
                  className="border rounded-lg text-sm px-1 py-2 w-full"
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Enter Title"
                />
              </td>
              <td>
                <input
                  className="border rounded-lg text-sm px-1 py-2 w-full"
                  type="text"
                  value={newBody}
                  onChange={(e) => setNewBody(e.target.value)}
                  placeholder="Enter Body Text"
                />
              </td>
              <td>
                <button
                  className="bg-blue-700 text-white w-full p-2 rounded-lg"
                  onClick={addUser}
                >
                  Add Data
                </button>
              </td>
            </tr>
            {userData.map((user) => (
              <tr>
                <td className="py-3 italic">{user.id}</td>
                <td className="text-center">{user.userId}</td>
                <td>{user.title}</td>
                <td>{user.body}</td>
                <td className="flex gap-2 p-1 ">
                  <button className="bg-blue-800 text-white rounded-sm px-3 py-1  ">
                    Edit
                  </button>
                  <button className="bg-red-800 text-white rounded-sm px-3 py-1  ">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Index;
