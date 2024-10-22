import { useEffect, useState } from "react";
import { EmployeeData } from "@/data/EmployeeData";
const Index = () => {
  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState([]);
  const [lastName, setLastName] = useState([]);
  const [age, setAge] = useState([]);
  const [id, setId] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    setData(EmployeeData);
  }, []);
  const handleEdit = (id) => {
    const dt = data.filter((item) => item.id === id);
    if (dt !== undefined) {
      setIsUpdate(true);
      setId(id);
      setFirstName(dt[0].firstName);
      setLastName(dt[0].lastName);
      setAge(dt[0].age);
    }
  };
  const handleDelete = (id) => {
    if (id > 0) {
      if (window.confirm("Are you sure you want to delete this row?")) {
        const dt = data.filter((item) => item.id !== id);
        setData(dt);
      }
    }
  };
  const handleSave = (e) => {
    let error = "";

    if (firstName === "") error+= "firstName is required! ";
    if (lastName === "") error+="lastName is required! ";
    if (age <=0) error+="age is required! ";

    if (error === "") {
      e.preventDefault();
      const dt = [...data];
      const newObject = {
        id: EmployeeData.length + 1,
        firstName: firstName,
        lastName: lastName,
        age: age,
      };
      dt.push(newObject);
      setData(dt);
      handleClear();
    }
    else{
        alert(error)
    }
  };
  const handleUpdate = () => {
    const index = data
      .map((item) => {
        return item.id;
      })
      .indexOf(id);
    const dt = [...data];
    dt[index].firstName = firstName;
    dt[index].lastName = lastName;
    dt[index].age = age;
    setData(dt);
    handleClear();
  };

  const handleClear = () => {
    setId(0);
    setFirstName("");
    setLastName("");
    setAge("");
    setIsUpdate(false);
  };
  return (
    <>
      <div className="p-10 flex flex-col gap-6 justify-center items-center">
        <div className="flex-col flex gap-2">
          <div className="flex gap-2 items-center">
            <label htmlFor="firstName">First Name</label>
            <input
              placeholder="Enter First Name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              type="text"
              className="bg-transparent text-sm p-1 border rounded-lg"
            />
          </div>
          <div className="flex gap-2 items-center">
            <label htmlFor="firstName">Last Name</label>
            <input
              placeholder="Enter Last Name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              type="text"
              className="bg-transparent text-sm p-1 border rounded-lg"
            />
          </div>
          <div className="flex gap-2 items-center">
            <label htmlFor="firstName">Age</label>
            <input
              placeholder="Enter Age"
              value={age}
              onChange={(e) => {
                setAge(e.target.value);
              }}
              type="number"
              className="bg-transparent text-sm p-1 border rounded-lg"
            />
          </div>
          <div className="flex gap-2 w-full justify-center">
            {isUpdate === false ? (
              <button
                onClick={(e) => {
                  handleSave(e);
                }}
                className="bg-blue-800 rounded-xl px-3 py-1  "
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => {
                  handleUpdate();
                }}
                className="bg-blue-800 rounded-xl px-3 py-1  "
              >
                Update
              </button>
            )}
            <button
              onClick={() => {
                handleClear();
              }}
              className="bg-red-800 rounded-xl px-3 py-1  "
            >
              Clear
            </button>
          </div>
        </div>
        <table className="table-fixed    border p-2 w-full text-center">
          <thead className="border-b">
            <tr>
              <td>Sr. no</td>
              <td>ID</td>
              <td>First Name</td>
              <td>Last Name</td>
              <td>Age</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {data.map((userData, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{userData.id}</td>
                <td>{userData.firstName}</td>
                <td>{userData.lastName}</td>
                <td>{userData.age}</td>
                <td className="flex gap-2 p-1">
                  <button
                    onClick={() => {
                      handleEdit(userData.id);
                    }}
                    className="bg-blue-800 rounded-xl px-3 py-1  "
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(userData.id);
                    }}
                    className="bg-red-800 rounded-xl px-3 py-1  "
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
