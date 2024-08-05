import { FC } from "react";
import { FiSearch } from "react-icons/fi";

import "./search.css";

type SearchType = {
  handleSearch: (str: string) => void;
};
export const Search: FC<SearchType> = ({ handleSearch }) => {
  const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(e.target.value);
  };

  return (
    <div className="search">
      <input
        type="text"
        className="search-input"
        placeholder="search task"
        onChange={HandleChange}
      />
      <button className="search-button">
        <FiSearch className="search-icon" />
      </button>
    </div>
  );
};
