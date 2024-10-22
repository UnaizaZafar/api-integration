import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => response.json())
      .then((json) => console.log("Json", json));
    // .then((data) => setJsonTitle(data.title));
  }, []);
 
  return (
    <>
      <div className="flex flex-col gap-4 p-10 justify-center items-center pt-10">
        <h1 className="font-bold text-4xl">Api integration</h1>
       
        <div className="flex  gap-2">
        <Link href="/fetch-methods" className="border rounded-xl p-2">
            {" "}
            API Methods{" "}
          </Link>
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
