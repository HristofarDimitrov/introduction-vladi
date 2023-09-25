import { getStanding } from "../services/standing"
import { useQuery } from "@tanstack/react-query"
import { Standing, StandingObj } from "../components/Standing"

type StandingData = {
  area: {}
  competition: {}
  filters: {}
  season: {}
  standings: [group: any, stage: string, table: StandingObj[], type: string]
}

export const Home = () => {
  const { isLoading, isError, data, error } = useQuery<StandingData, Error>({
    queryKey: ["standing"],
    queryFn: getStanding,
  })

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  const getCurrentDate = () => {
    const today = new Date()
    const day = String(today.getDate()).padStart(2, "0")
    const month = String(today.getMonth() + 1).padStart(2, "0")
    const year = String(today.getFullYear()).slice(-2)

    return `${day}/${month}/${year}`
  }

  const currentDate = getCurrentDate()

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4 flex justify-center text-center sm:justify-start">
        Premier League Standing for {currentDate}
      </h1>
      <div className="flex justify-center sm:justify-start">
        <Standing standing={data.standings[0].table} />
      </div>
    </div>
  )
}
