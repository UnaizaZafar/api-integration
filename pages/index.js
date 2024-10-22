import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  let [jsonTitle, setJsonTitle] = useState(null);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      // .then((data) => setJsonTitle(data.id))
      // .then((json) => console.log("Json",json));

      .then((data) => setJsonTitle(data.title));
  }, []);
  console.log("jsonTitle", jsonTitle);
  return (
    <>
      <div className="flex flex-col gap-4 justify-center items-center pt-10">
        <h1 className="font-bold text-2xl">Api integration</h1>
        {jsonTitle}
        {jsonTitle && jsonTitle.map((title) => <p>{title}</p>)}
        <Link href="/weather-api" className="border rounded-xl p-2"> Weather API </Link>
        <Link href="/crud-operation" className="border rounded-xl p-2"> CRUD Operations </Link>

      </div>
    </>
  );
}
