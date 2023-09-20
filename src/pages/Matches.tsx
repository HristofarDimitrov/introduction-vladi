import { useEffect, useState } from "react"
import { getMatches } from "../services/matches"
import { useQuery } from "@tanstack/react-query"
import { MatchDays } from "../components/MatchDays"
import { TodaysMatches } from "../components/TodaysMatches"
import { Match } from "../components/TodaysMatches"

type MatchData = {
  competition: {}
  filters: {}
  matches: Match[]
  resultSet: {}
}

export const Matches = () => {
  const [todaysMatches, setTodaysMatches] = useState<Match[]>([])
  const [selectedMatchday, setSelectedMatchday] = useState<number>(6)

  const { isLoading, isError, data, error } = useQuery<MatchData, Error>({
    queryKey: ["matches", selectedMatchday],
    queryFn: () => getMatches(selectedMatchday),
  })

  useEffect(() => {
    if (data) {
      setTodaysMatches(data.matches)
      console.log(data)
    }
  }, [data, selectedMatchday])

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  const matchDays = Array.from({ length: 36 }, (_, index) => index + 1)

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
        handleMatchdaySelect={setSelectedMatchday}
      />
      <TodaysMatches todaysMatches={todaysMatches} />
    </div>
  )
}
