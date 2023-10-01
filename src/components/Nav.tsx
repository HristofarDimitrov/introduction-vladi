import { NavLink } from "react-router-dom"

export const Nav = () => {
  return (
    <nav className="font-bold flex justify-center sm:justify-start">
      <ul>
        <li className="inline-block m-5 hover:text-gray-500">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="inline-block m-5 hover:text-gray-500">
          <NavLink to="/matches">Matches</NavLink>
        </li>
        <li className="inline-block m-5 hover:text-gray-500">
          <NavLink to="/team-matches">Team Matches</NavLink>
        </li>
      </ul>
    </nav>
  )
}
