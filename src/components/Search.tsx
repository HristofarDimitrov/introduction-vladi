import { useState, FC } from "react"
import Select from "react-select"
import { Team } from "../utils/teams"

const customStyles = {
  option: (styles: {}) => ({
    ...styles,
    cursor: "pointer",
    borderRadius: "10px",
  }),
  control: (styles: {}) => ({
    ...styles,
    borderRadius: "10px",
  }),
  menu: (styles: {}) => ({
    ...styles,
    borderRadius: "10px",
  }),
}

export type Option = {
  value: string
  label: string
  data: Team
}

type SearchProps = {
  onSearch: (searchTerm: string) => void
  placeholder?: string
  selectOptions: Team[]
  filterOption: (option: Option, inputValue: string) => boolean
}

export const Search: FC<SearchProps> = ({
  onSearch,
  placeholder = "Enter a search term",
  selectOptions,
  filterOption,
}) => {
  console.log(selectOptions)
  const [selectedOption, setSelectedOption] = useState<Team | null>()

  const handleChange = (selected: Team | null) => {
    setSelectedOption(selected)
    if (selected) {
      onSearch(selected.name)
    }
  }

  return (
    <div className="flex items-center justify-center sm:items-start sm:justify-start">
      <Select
        value={selectedOption}
        getOptionLabel={(team) => team.name}
        getOptionValue={(team) => team.id.toString()}
        onChange={handleChange}
        options={selectOptions}
        placeholder={placeholder}
        filterOption={filterOption}
        styles={customStyles}
        className="w-52"
      />
    </div>
  )
}
