export const getMatches = () => {
  return fetch("api/v4/competitions/PL/matches?matchday=6", {
    headers: {
      "X-Auth-Token": API_KEY,
    },
  }).then((response) => response.json());
};
