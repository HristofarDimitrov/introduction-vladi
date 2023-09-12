import { useEffect, useState } from "react";
import { getMatches } from "../services/matches";
import { useQuery } from "@tanstack/react-query";
import { MatchDays } from "../components/MatchDays";
import { TodaysMatches } from "../components/TodaysMatches";

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

  const matchDays = Array.from({ length: 36 }, (_, index) => index + 1);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">
        {todaysMatches.length > 0
          ? `English Premier League Matches for Day ${todaysMatches[0].matchday}`
          : "Loading..."}
      </h1>
      <MatchDays
        matchDays={matchDays}
        selectedMatchday={selectedMatchday}
        handleMatchdaySelect={handleMatchdaySelect}
      />
      <TodaysMatches todaysMatches={todaysMatches} />
    </div>
  );
};
