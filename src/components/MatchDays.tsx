import { FC } from "react"

interface MatchDaysProps {
  matchDays: number[]
  selectedMatchday: number
  handleMatchdaySelect: (matchday: number) => void
}

export const MatchDays: FC<MatchDaysProps> = ({
  matchDays,
  selectedMatchday,
  handleMatchdaySelect,
}) => {
  return (
    <ul className="flex flex-wrap list-none p-0">
      {matchDays.map((matchDay) => (
        <li key={matchDay} className="m-1">
          <button
            className={`text-orange-700 hover:bg-gray-400 rounded-lg bg-gray-300 p-1 w-8 h-8 ${
              selectedMatchday === matchDay ? ` bg-gray-400` : ``
            }`}
            onClick={() => handleMatchdaySelect(matchDay)}
          >
            {matchDay}
          </button>
        </li>
      ))}
    </ul>
  )
}
