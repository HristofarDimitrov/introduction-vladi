import { API_KEY } from "../utils/constants"

export const getTeamMatches = (id: number) => {
  return fetch(`api/v4/teams/${id}/matches`, {
    headers: {
      "X-Auth-Token": API_KEY,
    },
  }).then((response) => response.json())
}
