import { FC } from "react"

export interface Match {
  area: {
    id: number
    name: string
    code: string
    flag: string
  }
  competition: {
    id: number
    name: string
    code: string
    type: string
    emblem: string
  }
  season: {
    id: number
    startDate: string
    endDate: string
    currentMatchday: number
    winner: string | null
  }
  id: number
  utcDate: string
  status: string
  matchday: number
  stage: number
  group: string | null
  lastUpdated: string
  homeTeam: {
    id: number
    name: string
    shortName: string
    tla: string
    crest: string
  }
  awayTeam: {
    id: number
    name: string
    shortName: string
    tla: string
    crest: string
  }
  score: {
    winner: string | null
    duration: string
    fullTime: {
      home: string | null
      away: string | null
    }
    halfTime: {
      home: string | null
      away: string | null
    }
  }
  odds: {
    msg: string
  }
  referees: []
}

export interface TodaysMatchesProp {
  todaysMatches: Match[]
}

export const TodaysMatches: FC<TodaysMatchesProp> = ({ todaysMatches }) => {
  return (
    <ul>
      {todaysMatches.map((match: Match) => (
        <li key={match.id}>
          <div className="mx-2 my-3 w-48 bg-gray-300 px-2 py-1 rounded-lg">
            <div className="flex justify-between m-1">
              <div className="flex items-center">
                <img src={match.homeTeam.crest} className="w-5 h-5 mr-1" />
                {match.homeTeam.shortName}
              </div>
              <div>{match.score.fullTime.home}</div>
            </div>
            <div className="flex justify-between m-1">
              <div className="flex items-center">
                <img src={match.awayTeam.crest} className="w-5 h-5 mr-1" />
                {match.awayTeam.shortName}
              </div>
              <div>{match.score.fullTime.away}</div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
