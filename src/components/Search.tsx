import Select from "react-select"

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

export type Option<T> = {
  value: string
  label: string
  data: T
}

type SearchProps<T> = {
  onSearch: (searchTerm?: string) => void
  placeholder?: string
  selectOptions: Option<T>[]
  filterOption: (option: Option<T>, inputValue: string) => boolean
}

export function Search<T>({
  onSearch,
  placeholder = "Enter a search term",
  selectOptions,
  filterOption,
}: SearchProps<T>) {
  return (
    <div className="flex items-center justify-center sm:items-start sm:justify-start">
      <Select
        onChange={(option: Option<T> | null) => onSearch(option?.value)}
        options={selectOptions as T[]}
        placeholder={placeholder}
        filterOption={filterOption}
        styles={customStyles}
        className="w-52"
      />
    </div>
  )
}
