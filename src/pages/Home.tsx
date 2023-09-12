import { useEffect, useState } from "react";
import { getStanding } from "../services/standing";
import { useQuery } from "@tanstack/react-query";

export const Home = () => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["standing"],
    queryFn: getStanding,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (data) {
    console.log(data.standings[0].table);
  }

  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = String(today.getFullYear()).slice(-2);

    return `${day}/${month}/${year}`;
  };

  const currentDate = getCurrentDate();

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Home</h1>
      <h3 className="text-xl font-bold mb-2">
        Premier League Standing for {currentDate}{" "}
      </h3>
      <ul>
        {data.standings[0].table.map((team) => (
          <li key={team.team.id}>
            <div className="flex align-bottom">
              {team.position}.
              <img src={team.team.crest} className="w-4 h-4 mx-1 mt-1" />
              {team.team.shortName} - {team.points} points
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
