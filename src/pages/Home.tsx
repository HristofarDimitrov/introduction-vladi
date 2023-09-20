import { useEffect, useState } from "react"
import { getStanding } from "../services/standing"
import { useQuery } from "@tanstack/react-query"
import { Standing } from "../components/Standing"

export const Home = () => {
  const { isLoading, isError, data, error } = useQuery<any, Error>({
    queryKey: ["standing"],
    queryFn: getStanding,
  })

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  if (data) {
    console.log(data.standings[0].table)
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
      <h1 className="text-3xl font-bold mb-4">
        Premier League Standing for {currentDate}
      </h1>
      <Standing standing={data.standings[0].table} />
    </div>
  )
}
