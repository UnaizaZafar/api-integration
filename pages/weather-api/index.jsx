import React, { useEffect, useState } from "react";
const URL = `http://api.weatherapi.com/v1/current.json?key=597db7d94926462f820104506242210&q=London&aqi=no`;
const Page = () => {
  const [temp, setTemp] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(URL);
      result.json().then(json => {
        setTemp(json.current.temp_f)
       
      });
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="flex justify-center items-center pt-10">
        <p className="font-semibold text-xl">
          Temperature in Farenheit: {temp}F
        </p>
      </div>
    </>
  );
};

export default Page;
