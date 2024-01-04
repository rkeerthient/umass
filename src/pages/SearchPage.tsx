import { useSearchActions, useSearchState } from "@yext/search-headless-react";

import { onSearchFunc, SearchBar } from "@yext/search-ui-react";
import { useEffect, useState } from "react";
import ProductsPage from "./ProductsPage";
import VendorsPage from "./VendorsPage";
import InvoicesPage from "./InvoicesPage";
import UniversalPage from "./UniversalPage";
import POsPage from "./POsPage";

export const universalLimit = {
  products: 5,
  vendors: 5,
};

const SearchPage = () => {
  const searchActions = useSearchActions();
  const vert = useSearchState((state) => state.vertical.verticalKey);
  const [currentPath, setCurrentPath] = useState({
    label: "All Results",
    id: "all",
  });
  const navbarItem = [
    {
      label: "All Results",
      id: "all",
    },

    {
      label: "Products",
      id: "products",
    },
    {
      label: "Vendors",
      id: "vendors",
    },
    {
      label: "Invoices ",
      id: "invoices",
    },
    {
      label: "Puchase Orders ",
      id: "orders",
    },
  ];

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const verticalKey = new URLSearchParams(window.location.search).get(
      "vertical"
    );
    const query = new URLSearchParams(window.location.search).get("query");
    verticalKey
      ? (setCurrentPath(
          navbarItem.filter((item) => item.id === verticalKey)[0]
        ),
        searchActions.setVertical(verticalKey))
      : queryParams.delete("vertical");
    query && searchActions.setQuery(query);
    verticalKey
      ? (searchActions.setVertical(verticalKey),
        searchActions.executeVerticalQuery())
      : (searchActions.setUniversal(),
        searchActions.setUniversalLimit(universalLimit),
        searchActions.executeUniversalQuery());
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    currentPath.id !== "all"
      ? queryParams.set("vertical", currentPath.id)
      : queryParams.delete("vertical");
    history.pushState(null, "", "?" + queryParams.toString());
  }, [currentPath]);

  const handleSearch: onSearchFunc = (searchEventData) => {
    const { query } = searchEventData;
    const queryParams = new URLSearchParams(window.location.search);

    if (query) {
      queryParams.set("query", query);
    } else {
      queryParams.delete("query");
    }
    history.pushState(null, "", "?" + queryParams.toString());
    query && searchActions.setQuery(query);
    vert
      ? (searchActions.setVertical(vert), searchActions.executeVerticalQuery())
      : (searchActions.setUniversal(),
        searchActions.setUniversalLimit(universalLimit),
        searchActions.executeUniversalQuery());
  };

  return (
    <div className="w-full md:px-10 ">
      <SearchBar
        hideRecentSearches={true}
        customCssClasses={{
          searchBarContainer: "!mb-0 flex-1 searchBar",
          searchButton: "text-black",
        }}
        onSearch={handleSearch}
      />
      <div className=" bg-white mt-4 px-1 md:px-6 border-y sm:relative ">
        <div className="mx-auto ">
          <div className="h-16  justify-between hidden md:flex ">
            <div className="ml-6 flex justify-between flex-1">
              {navbarItem.map((item) => (
                <button
                  key={item.id}
                  className={`${
                    currentPath.id === item.id
                      ? "text-black border-b-4 border-[#ee0000]"
                      : "text-[#919393] border-transparent"
                  } inline-flex items-center px-1 pt-1  hover:border-primary-green border-b-2 text-lg font-medium`}
                  onClick={() => setCurrentPath(item)}
                >
                  <div className="font-bold">{item.label ?? item.id}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {currentPath && currentPath.id === "products" ? (
        <ProductsPage />
      ) : currentPath.id === "vendors" ? (
        <VendorsPage />
      ) : currentPath.id === "invoices" ? (
        <InvoicesPage />
      ) : currentPath.id === "orders" ? (
        <POsPage />
      ) : (
        <UniversalPage />
      )}
    </div>
  );
};

export default SearchPage;
