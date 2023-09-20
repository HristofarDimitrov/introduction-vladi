import { FC } from "react"

interface Standing {
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
  standing: Standing[]
}

export const Standing: FC<StandingProps> = ({ standing }) => {
  return (
    <ul>
      {standing.map((team) => (
        <li key={team.team.id}>
          <div className="flex align-bottom">
            {team.position}.
            <img src={team.team.crest} className="w-4 h-4 mx-1 mt-1" />
            {team.team.shortName} - {team.points} points
          </div>
        </li>
      ))}
    </ul>
  )
}
