export const MatchDays = ({
  matchDays,
  selectedMatchday,
  handleMatchdaySelect,
}) => {
  return (
    <ul className="flex flex-wrap list-none p-0">
      {matchDays.map((matchDay) => (
        <li key={matchDay} className="m-1">
          <button
            className={`text-blue-700 hover:underline ${
              selectedMatchday === matchDay ? `underline` : ``
            }`}
            onClick={() => handleMatchdaySelect(matchDay)}
          >
            {matchDay}
          </button>
        </li>
      ))}
    </ul>
  );
};
