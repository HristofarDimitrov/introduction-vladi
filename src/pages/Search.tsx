import { useEffect, useState, useRef } from "react"
import { getTeamMatches } from "../services/searchTeam"
import { useQuery } from "@tanstack/react-query"
import { TodaysMatches } from "../components/TodaysMatches"
import { Match } from "../components/TodaysMatches"
import { teams, Team } from "../utils/teams"

type SearchTeamData = {
  filters: {}
  matches: Match[]
  resultSet: {}
}

export const Search = () => {
  const [teamId, setTeamId] = useState<number>(73)
  const [inputValue, setInputValue] = useState<string>("")
  const [filteredTeams, setFilteredTeams] = useState<Team[]>(teams)
  const [showDropdown, setShowDropdown] = useState<boolean>(false)
  const [searchPerformed, setSearchPerformed] = useState<boolean>(false)

  const { isLoading, isError, data, error } = useQuery<SearchTeamData, Error>({
    queryKey: ["search", teamId],
    queryFn: () => getTeamMatches(teamId),
  })

  const dropdownRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !(event.target instanceof HTMLInputElement)
      ) {
        setShowDropdown(false)
      }
    }

    document.addEventListener("click", handleClickOutside)

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])

  const handleInputChange = (e: any) => {
    const input = e.target.value
    setInputValue(input)

    const filtered = teams.filter(
      (team) =>
        team.name.toLowerCase().includes(input.toLowerCase()) ||
        team.shortName.toLowerCase().includes(input.toLowerCase()) ||
        team.tla.toLowerCase().includes(input.toLowerCase())
    )

    setFilteredTeams(filtered)
    setShowDropdown(filtered.length > 0)
  }

  const handleSearchClick = () => {
    teams.map((team) => {
      if (
        team.name.toLowerCase() === inputValue.toLowerCase() ||
        team.shortName.toLowerCase() === inputValue.toLowerCase() ||
        team.tla.toLowerCase() === inputValue.toLowerCase()
      ) {
        setTeamId(team.id)
        setSearchPerformed(true)
        setShowDropdown(false)
      }
    })
  }

  const handleTeamSelect = (selectedTeam: Team) => {
    setInputValue(selectedTeam.name)
    setTeamId(selectedTeam.id)
    setShowDropdown(false)
    setSearchPerformed(true)
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
          Enter an Enlglish Premeir League team to see its matches
        </h4>
        <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-y-0 sm:space-x-4 ">
          <div className="relative" ref={dropdownRef}>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter a team name"
              className="px-2 py-1 rounded-lg"
            />
            {showDropdown && (
              <div className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-md">
                <ul>
                  {filteredTeams.map((team) => (
                    <li
                      key={team.id}
                      className="cursor-pointer px-4 py-2 hover:bg-gray-200"
                      onClick={() => handleTeamSelect(team)}
                    >
                      {team.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <button
            onClick={handleSearchClick}
            className="px-2 py-1 bg-gray-300 rounded-lg"
          >
            Search
          </button>
        </div>
      </div>
      {searchPerformed && (
        <div className="flex justify-center sm:justify-start">
          <TodaysMatches todaysMatches={data.matches} />
        </div>
      )}
    </div>
  )
}
