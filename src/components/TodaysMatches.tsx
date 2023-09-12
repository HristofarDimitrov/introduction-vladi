export const TodaysMatches = ({ todaysMatches }) => {
  return (
    <ul>
      {todaysMatches.map((match) => (
        <li key={match.id}>
          <div className="flex items-center">
            <img src={match.homeTeam.crest} className="w-5 h-5 mr-1" />
            {match.homeTeam.shortName} vs<span className="ml-2"></span>
            <img src={match.awayTeam.crest} className="w-5 h-5 mr-1" />
            {match.awayTeam.shortName}
          </div>
        </li>
      ))}
    </ul>
  );
};
