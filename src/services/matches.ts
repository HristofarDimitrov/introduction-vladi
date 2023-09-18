import { API_KEY } from "../utils/constants"

export const getMatches = (matchday: number) => {
  return fetch(`api/v4/competitions/PL/matches?matchday=${matchday}`, {
    headers: {
      "X-Auth-Token": API_KEY,
    },
  }).then((response) => response.json())
}
