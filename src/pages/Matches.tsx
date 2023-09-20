import { useEffect, useState } from "react"
import { getMatches } from "../services/matches"
import { useQuery } from "@tanstack/react-query"
import { MatchDays } from "../components/MatchDays"
import { TodaysMatches } from "../components/TodaysMatches"
import { Match } from "../components/TodaysMatches"

export const Matches = () => {
  const [todaysMatches, setTodaysMatches] = useState<Match[]>([])
  const [selectedMatchday, setSelectedMatchday] = useState<number>(1)

  const { isLoading, isError, data, error } = useQuery<any, Error>({
    queryKey: ["matches", selectedMatchday],
    queryFn: () => getMatches(selectedMatchday),
  })

  useEffect(() => {
    if (data) {
      setTodaysMatches(data.matches)
      console.log(data.matches)
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
          ? `English Premier League Matches for Round ${todaysMatches[0].matchday}`
          : "Loading..."}
      </h1>
      <div className="flex space-x-14">
        <div className="max-w-xs">
          <h4 className="text-xl font-bold mb-2">Choose a round</h4>
          <MatchDays
            matchDays={matchDays}
            selectedMatchday={selectedMatchday}
            handleMatchdaySelect={setSelectedMatchday}
          />
        </div>
        <div>
          <TodaysMatches todaysMatches={todaysMatches} />
        </div>
      </div>
    </div>
  )
}
