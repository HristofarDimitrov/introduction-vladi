import { FC } from "react"
import { BiDownArrow } from "react-icons/bi"

interface MatchDaysProps {
  matchDays: number[]
  selectedMatchday: number
  handleMatchdaySelect: (matchday: number) => void
}

export const MatchDaysDropdown: FC<MatchDaysProps> = ({
  matchDays,
  selectedMatchday,
  handleMatchdaySelect,
}) => {
  return (
    <div className="relative inline-block">
      <select
        className="text-orange-700 hover:bg-gray-400 rounded-lg bg-gray-300 p-1 w-28 h-8 appearance-none"
        value={selectedMatchday}
        onChange={(e) => handleMatchdaySelect(Number(e.target.value))}
      >
        {matchDays.map((matchDay) => (
          <option key={matchDay} value={matchDay}>
            Round {matchDay}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <BiDownArrow />
      </div>
    </div>
  )
}
