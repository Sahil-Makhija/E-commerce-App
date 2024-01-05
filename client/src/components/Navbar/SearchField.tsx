import { BiSearch } from "react-icons/bi";
import { ReactElement, Dispatch, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchSuggestions from "./SearchSuggestions";
import { ProductSuggestion } from "../../types";

type SearchFieldProps = {
  placeholder: string;
  searchValue: string;
  setSearchValue: Dispatch<React.SetStateAction<string>>;
  onSearch: (val: string) => void;
  SearchIcon?: ReactElement;
  productSuggestions: ProductSuggestion[];

  showSearchSuggestions: boolean;
  setShowSearchSuggestions: Dispatch<React.SetStateAction<boolean>>;
};

const SearchField = ({
  placeholder,
  searchValue,
  setSearchValue,
  onSearch,
  SearchIcon,
  productSuggestions,

  showSearchSuggestions,
  setShowSearchSuggestions,
}: SearchFieldProps) => {
  const navigate = useNavigate();
  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(searchValue.trim());
    }, 1000);
    return () => clearTimeout(timeout);
  }, [searchValue, onSearch]);

  return (
    <div className=" min-h-full  max-w-[600px]">
      <div className="flex w-full items-center justify-center flex-1 min-h-[2.5rem] px-2 rounded-md bg-gray-100 ">
        <button className="aspect-square h-full flex-center">
          {SearchIcon || <BiSearch color="gray" size={25} />}
        </button>
        <input
          onKeyDown={(e) => {
            if (searchValue === "") return;
            if (e.key === "Enter") {
              navigate("/product/search/" + searchValue);
            }
          }}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className=" peer px-4 text-sm lg:text-lg bg-transparent w-full focus:outline-none "
          placeholder={placeholder || "Search for Products , Brands and More"}
          type="search"
        />
      </div>
      <SearchSuggestions
        showSearchSuggestions={showSearchSuggestions}
        setShowSearchSuggestions={setShowSearchSuggestions}
        productSuggestions={productSuggestions}
      />
    </div>
  );
};

export default SearchField;
