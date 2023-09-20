import { FC } from "react"

export interface StandingObj {
  position: number
  team: {
    id: number
    name: string
    shortName: string
    tla: string
    crest: string
  }
  playedGames: number
  form: null | string
  won: number
  draw: number
  lost: number
  points: number
  goalsFor: number
  goalsAgainst: number
  goalDifference: number
}

interface StandingProps {
  standing: StandingObj[]
}

export const Standing: FC<StandingProps> = ({ standing }) => {
  return (
    <ul>
      {standing.map((team) => (
        <li key={team.team.id}>
          <div className="inline-flex align-bottom bg-gray-300 rounded-lg pl-1 py-0.5 mb-1 w-auto font-bold">
            <div className="flex w-6 justify-center">{team.position}.</div>
            <div className="flex w-40">
              <img src={team.team.crest} className="w-4 h-4 mx-1 mt-1" />
              {team.team.shortName}
            </div>
            <div className="w-16 px-1 rounded-r-lg bg-gray-300">
              {team.points} {team.points === 1 ? "pt" : "pts"}
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
