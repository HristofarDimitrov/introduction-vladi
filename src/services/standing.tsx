import { API_KEY } from "../utils/constants";

export const getStanding = () => {
  return fetch(`api/v4/competitions/PL/standings`, {
    headers: {
      "X-Auth-Token": API_KEY,
    },
  }).then((response) => response.json());
};
