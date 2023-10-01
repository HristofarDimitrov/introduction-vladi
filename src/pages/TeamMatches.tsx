import { useEffect, useState } from "react"
import { getTeamMatches } from "../services/searchTeam"
import { useQuery } from "@tanstack/react-query"
import { TodaysMatches } from "../components/TodaysMatches"
import { Match } from "../components/TodaysMatches"
import { teams, Team } from "../utils/teams"
import { Search, Option } from "../components/Search"

type SearchTeamData = {
  filters: {}
  matches: Match[]
  resultSet: {}
}

export const TeamMatches = () => {
  const [teamId, setTeamId] = useState<number>(73)
  const [searchPerformed, setSearchPerformed] = useState<boolean>(false)

  const { isLoading, isError, data, error } = useQuery<SearchTeamData, Error>({
    queryKey: ["search", teamId],
    queryFn: () => getTeamMatches(teamId),
  })

  const handleSearch = (inputValue: string) => {
    teams.map((team) => {
      if (
        team.name.toLowerCase() === inputValue?.toLowerCase() ||
        team.shortName.toLowerCase() === inputValue?.toLowerCase() ||
        team.tla.toLowerCase() === inputValue?.toLowerCase()
      ) {
        setTeamId(team.id)
        setSearchPerformed(true)
      }
    })
  }

  const handleSelect = (options: Option, search: string) => {
    return (
      options.data?.name?.toLowerCase().includes(search.toLowerCase()) ||
      options.data?.shortName?.toLowerCase().includes(search.toLowerCase()) ||
      options.data?.tla?.toLowerCase().includes(search.toLowerCase())
    )
  }

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <div>
      <div className="my-2">
        <h4 className="text-xl font-bold mb-2 flex justify-center text-center px-1 sm:justify-start sm:px-0">
          Select an Enlglish Premeir League team to see its matches
        </h4>
        <Search
          onSearch={handleSearch}
          placeholder="Enter a team name"
          selectOptions={teams}
          filterOption={handleSelect}
        />
      </div>
      {searchPerformed && (
        <div className="flex justify-center sm:justify-start">
          <TodaysMatches todaysMatches={data.matches} />
        </div>
      )}
    </div>
  )
}
