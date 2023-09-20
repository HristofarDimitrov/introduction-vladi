import { useEffect, useState } from "react"
import { getMatches } from "../services/matches"
import { useQuery } from "@tanstack/react-query"
import { MatchDays } from "../components/MatchDays"
import { MatchDaysDropdown } from "../components/MatchDaysDropdown"
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
  const [selectedMatchday, setSelectedMatchday] = useState<number>(1)

  const { isLoading, isError, data, error } = useQuery<MatchData, Error>({
    queryKey: ["matches", selectedMatchday],
    queryFn: () => getMatches(selectedMatchday),
  })

  useEffect(() => {
    if (data) {
      setTodaysMatches(data.matches)
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
      <h1 className="text-3xl font-bold mb-4 flex justify-center text-center sm:justify-start">
        {todaysMatches.length > 0
          ? `English Premier League Matches for Round ${todaysMatches[0].matchday}`
          : "Loading..."}
      </h1>
      <div className="sm:flex">
        <div className="max-w-xs m-0 mb-6 mx-auto sm:hidden">
          <h4 className="text-xl font-bold mb-2 flex justify-center">
            Choose a round
          </h4>
          <div className="flex justify-center">
            <MatchDaysDropdown
              matchDays={matchDays}
              selectedMatchday={selectedMatchday}
              handleMatchdaySelect={setSelectedMatchday}
            />
          </div>
        </div>
        <div className="hidden max-w-xs sm:block sm:mr-14">
          <h4 className="text-xl font-bold mb-2">Choose a round</h4>
          <MatchDays
            matchDays={matchDays}
            selectedMatchday={selectedMatchday}
            handleMatchdaySelect={setSelectedMatchday}
          />
        </div>
        <div className="flex justify-center sm:flex-none">
          <TodaysMatches todaysMatches={todaysMatches} />
        </div>
      </div>
    </div>
  )
}
