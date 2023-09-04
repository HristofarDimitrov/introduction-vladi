import { useEffect, useState } from "react";
import { getMatches } from "../services/matches";
import { useQuery } from "@tanstack/react-query";

export const Matches = () => {
  const [todaysMatches, setTodaysMatches] = useState([]);
  const [selectedMatchday, setSelectedMatchday] = useState(6);

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["matches", selectedMatchday],
    queryFn: () => getMatches(selectedMatchday),
  });

  const handleMatchdaySelect = (matchday) => {
    setSelectedMatchday(matchday);
  };

  useEffect(() => {
    if (data) {
      setTodaysMatches(data.matches);
    }
  }, [data, selectedMatchday]);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  console.log(todaysMatches);

  // const matchDaysList = () => {
  //   const matchDays = Array.from({length: 36}, (_, index) => index + 1)
  // }

  const matchDays = Array.from({ length: 36 }, (_, index) => index + 1);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">
        {todaysMatches.length > 0
          ? `English Premier League Matches for Day ${todaysMatches[0].matchday}`
          : "Loading..."}
      </h1>
      <ul className="flex flex-wrap list-none p-0">
        {matchDays.map((matchDay) => (
          <li key={matchDay} className="m-1">
            <button
              className={`text-blue-700 hover:underline ${
                selectedMatchday === matchDay ? `underline` : ``
              }`}
              onClick={() => handleMatchdaySelect(matchDay)}
            >
              {matchDay}
            </button>
          </li>
        ))}
      </ul>
      <ul>
        {todaysMatches.map((match) => (
          <li key={match.id}>
            <div className="flex items-center">
              <img src={match.homeTeam.crest} className="w-5 h-5 mr-1" />
              {match.homeTeam.shortName} vs<span className="ml-2"></span>
              <img src={match.awayTeam.crest} className="w-5 h-5 mr-1" />
              {match.awayTeam.shortName}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
