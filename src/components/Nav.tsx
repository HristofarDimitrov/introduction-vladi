import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <nav className="">
      <ul className="">
        <li className="inline-block m-5">
          <Link to="/">Home</Link>
        </li>
        <li className="inline-block m-5">
          <Link to="/matches">Matches</Link>
        </li>
      </ul>
    </nav>
  );
};
