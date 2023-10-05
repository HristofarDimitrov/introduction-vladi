import { useState } from "react"
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

  const handleSearch = (inputValue?: string) => {
    const foundTeam = teams.find(
      (team) =>
        team.name.toLowerCase() === inputValue?.toLowerCase() ||
        team.shortName.toLowerCase() === inputValue?.toLowerCase() ||
        team.tla.toLowerCase() === inputValue?.toLowerCase()
    )
    if (foundTeam) {
      setTeamId(foundTeam.id)
      setSearchPerformed(true)
    }
  }

  const handleSelect = (options: Option<Option<Team>>, search: string) => {
    return (
      options.label.toLowerCase().includes(search.toLowerCase()) ||
      options.data.data?.name?.toLowerCase().includes(search.toLowerCase()) ||
      options.data.data?.shortName
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      options.data.data?.tla?.toLowerCase().includes(search.toLowerCase())
    )
  }

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  const teamsOptions: Option<Team>[] = teams.map((team) => ({
    value: team.name,
    label: team.name,
    data: { ...team },
  }))

  return (
    <div>
      <div className="my-2">
        <h4 className="text-xl font-bold mb-2 flex justify-center text-center px-1 sm:justify-start sm:px-0">
          Select an Enlglish Premeir League team to see its matches
        </h4>
        <Search
          onSearch={handleSearch}
          placeholder="Enter a team name"
          selectOptions={teamsOptions}
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
