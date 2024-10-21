import { useEffect } from "react";
export default function Home() {
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => response.json())
      .then((json) => console.log("Json", json));
  }, []);
  return (
    <>
      
        <h1 className="font-bold text-2xl">
        Api integration
        </h1>
       
    </>
  );
}
