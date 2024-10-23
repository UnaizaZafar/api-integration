import { useState, useEffect } from "react";
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
    const userId = newUserId;
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
          const newId = data.id || Date.now();
          setuserData([...userData, { ...data, id: newId }]);
          setNewUserId(0);
          setNewTitle("");
          setNewBody("");
          alert("Data Added Successfully!");
        });
    } else {
      alert("Please fill in all fields.");
    }
  };
  let [editingId, setEditingId] = useState(null);
  const editUser = (id) => {
    const userToEdit = userData.find((user) => user.id === id);
    if (userToEdit) {
      setEditingId(id);
      setNewUserId(userToEdit.userId);
      setNewTitle(userToEdit.title);
      setNewBody(userToEdit.body);
    }
  };
  const updateUser = () => {
    if (!editingId) return; // Ensure that an ID is being edited
    const updatedUser = {
      userId: newUserId,
      title: newTitle,
      body: newBody,
      id: editingId,
    };

    fetch(`https://jsonplaceholder.typicode.com/posts/${editingId}`, {
      method: "PUT",
      body: JSON.stringify(updatedUser),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setuserData((prevState) =>
          prevState.map((user) =>
            user.id === editingId ? { ...user, ...data } : user
          )
        );
        alert("Data Updated Successfully!");
        clearForm(); // Reset form after successful update
      })
      .catch((error) => console.log("Error updating user:", error));
  };

  const clearForm = () => {
    setNewUserId(0);
    setNewTitle("");
    setNewBody("");
    setEditingId(null); // Reset editing state
  };
  const onChangeHandler = (key, value) => {
    if (key === "userId") setNewUserId(value);
    if (key === "title") setNewTitle(value);
    if (key === "body") setNewBody(value);
  };
  const deleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this row?")) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then(() => {
          setuserData((values) => values.filter((item) => item.id !== id));
        });
      alert("User Deleted Successfully!");
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center p-10">
        <h2 className="font-bold text-2xl">Fetch API GET & POST Method</h2>

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
                <td >
                  {editingId ? (
                    <button
                      className="bg-green-700 text-white  p-2 rounded-lg"
                      onClick={updateUser} // Call update when editing
                    >
                      Update Data
                    </button>
                  ) : (
                    <button
                      className="bg-blue-700 text-white p-2 rounded-lg"
                      onClick={addUser} // Call add when not editing
                    >
                      Add Data
                    </button>
                  )}
                </td>
              </td>
            </tr>
            {userData.map((user, index) => (
              <tr key={index}>
                <td className="py-3 italic">{index + 1}</td>
                <td className="text-center">{user.userId}</td>
                <td>{user.title}</td>
                <td>{user.body}</td>
                <td className="flex gap-2 p-1 ">
                  <button
                    onClick={() => editUser(user.id)}
                    className="bg-blue-800 text-white rounded-sm px-3 py-1  "
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="bg-red-800 text-white rounded-sm px-3 py-1  "
                  >
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
