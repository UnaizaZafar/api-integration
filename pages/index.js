import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  let [userData, setuserData] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => response.json())
      .then((json) => console.log("Json", json));
    // .then((data) => setJsonTitle(data.title));
  }, []);
  const users = ``;
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setuserData(data));
  }, []);
  console.log("users Data", userData);
  return (
    <>
      <div className="flex flex-col gap-4 p-10 justify-center items-center pt-10">
        <h1 className="font-bold text-4xl">Api integration</h1>
        <h2 className="font-bold text-2xl">Fetch API GET Method</h2>
        <table className="w-full border p-2 text-center">
          <thead className="border-b py-3">
            <tr>
              <td>Name</td>
              <td>Phone number</td>
              <td>Website</td>
              <td>City</td>
              <td>Company</td>
            </tr>
            
          </thead>
          {userData.map((user) => (
            <tbody>
              <tr>
              <td>{user.name}</td>
              <td>{user.phone}</td>
              <td>{user.website}</td>
              <td>{user.address.city}</td>
              <td>{user.company.name}</td>
              </tr>
            </tbody>
          ))}
        </table>

        <div className="flex gap-2">
          <Link href="/weather-api" className="border rounded-xl p-2">
            {" "}
            Weather API{" "}
          </Link>
          <Link href="/crud-operation" className="border rounded-xl p-2">
            {" "}
            CRUD Operations{" "}
          </Link>
        </div>
      </div>
    </>
  );
}
