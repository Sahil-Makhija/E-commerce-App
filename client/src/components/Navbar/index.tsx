import { useState } from "react";
import SearchField from "./SearchField";
import Logo from "./Logo";
import ProfileDropdown from "./ProfileDropdown";
import CartIcon from "./CartIcon";
import NavDrawer from "./mobile";
import { API } from "../../API/routes";
import { ProductSuggestion } from "../../types";

const Navbar: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [productSuggestions, setProductSuggestions] = useState<
    ProductSuggestion[]
  >([]);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);

  const handleSearch = () => {
    if (searchValue === "") {
      setProductSuggestions([]);
      return;
    }
    API.SearchProduct({ search: searchValue }).then((response) => {
      if (response.status) {
        setProductSuggestions(
          response.products.map((product) => ({
            productName: product.productName,
            image: product.images?.[0] || product.imageSrc || "",
            slug: product.slug,
          }))
        );
      }
    });
  };
  return (
    <nav
      onClick={() => setShowSearchSuggestions(false)}
      className="bg-white flex items-baseline overflow-visible justify-end lg:justify-evenly w-full  lg:h-16 fixed top-0  border-gray max-lg:p-1 max-lg:gap-x-2 z-20 pt-1"
    >
      <Logo src="" />
      <NavDrawer />
      <div
        onClick={(e) => {
          e.stopPropagation();
          setShowSearchSuggestions(true);
        }}
        className=" flex-1 max-w-[600px] h-max overflow-visible"
      >
        <SearchField
          placeholder="Search E-commerce Store"
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onSearch={handleSearch}
          productSuggestions={productSuggestions}
          setShowSearchSuggestions={setShowSearchSuggestions}
          showSearchSuggestions={showSearchSuggestions}
        />
      </div>
      <ProfileDropdown />
      <CartIcon />
    </nav>
  );
};

export default Navbar;
