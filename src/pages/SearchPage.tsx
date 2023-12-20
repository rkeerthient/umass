import {
  provideHeadless,
  useSearchActions,
  useSearchState,
  VerticalResults as VerticalResultsData,
} from "@yext/search-headless-react";

import {
  DropdownItem,
  FocusedItemData,
  onSearchFunc,
  RenderEntityPreviews,
  SearchBar,
} from "@yext/search-ui-react";
import { useEffect, useState } from "react";

import searchConfig from "../components/searchConfig";
import { Image } from "@yext/pages-components";
export const universalLimit = {
  devices: 5,
  faqs: 5,
  contact_information: 5,
  links: 5,
  locations: 5,
  videos: 5,
};
const entityPreviewSearcher = provideHeadless({
  ...searchConfig,
  headlessId: "entity-preview-searcher",
});
const renderEntityPreviews: RenderEntityPreviews = (
  autocompleteLoading: boolean,
  verticalKeyToResults: Record<string, VerticalResultsData>,
  dropdownItemProps: {
    onClick: (
      value: string,
      _index: number,
      itemData?: FocusedItemData
    ) => void;
    ariaLabel: (value: string) => string;
  }
): JSX.Element | null => {
  const productResults = verticalKeyToResults["devices"]?.results.map(
    (result) => result.rawData
  ) as unknown as Ce_device[];
  return productResults ? (
    <div className="grid md:grid-cols-4 grid-ciols-1 px-2 gap-2 text-black">
      {productResults.map((result) => (
        <DropdownItem
          className="border gap-2"
          key={result.id}
          value={result.name}
          onClick={() => history.pushState(null, "", `/product/${result.id}`)}
          ariaLabel={dropdownItemProps.ariaLabel}
        >
          <DropdownItem
            key={result.id}
            value={result.name}
            ariaLabel={dropdownItemProps.ariaLabel}
          >
            <a
              href={"https://verizon.com"}
              className="flex items-center md:flex-col gap-2 w-full"
            >
              {result.c_answersPhoto ? (
                <Image
                  image={result.c_answersPhoto}
                  className="h-full !w-32 md:!w-full p-6 mx-auto"
                />
              ) : (
                <img
                  src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Femfprotectionaustralia.com.au%2Fwp-content%2Fuploads%2F2015%2F07%2Fplaceholder-product.jpg&f=1&nofb=1&ipt=a9e4d6696ca75f1a86e4956ffe79955d42cd8e7777f0d0d7953c31031fc266b2&ipo=images"
                  className="h-full !w-full p-6 mx-auto"
                  alt=""
                />
              )}
              <div className="flex w-1/2 md:w-full flex-col gap-2 px-1">
                <div className="text-xs">{result.name}</div>
                <div className="text-sm">£{result.c_price?.value}</div>
              </div>
            </a>
          </DropdownItem>
        </DropdownItem>
      ))}
    </div>
  ) : null;
};
const SearchPage = () => {
  const searchActions = useSearchActions();
  const vert = useSearchState((state) => state.vertical.verticalKey);
  const [showDropdown, setShowDropdown] = useState(false);
  const [results, setResults] = useState<any>();
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
      label: "Devices",
      id: "devices",
    },
    {
      label: "FAQs",
      id: "faqs",
    },
    {
      label: "Contact Information",
      id: "contactInfo",
    },
    {
      label: "Links",
      id: "links",
    },
    {
      label: "Locations",
      id: "locations",
    },
    {
      label: "Videos",
      id: "videos",
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
        searchActions
          .executeVerticalQuery()
          .then((res) =>
            query
              ? verticalKey === "devices" &&
                setResults(res?.verticalResults.results[0])
              : setResults(undefined)
          ))
      : (searchActions.setUniversal(),
        searchActions.setUniversalLimit(universalLimit),
        searchActions
          .executeUniversalQuery()
          .then((res) =>
            query && res?.verticalResults[0].verticalKey === "devices"
              ? setResults(res?.verticalResults[0].results[0])
              : setResults(undefined)
          ));
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
      ? (searchActions.setVertical(vert),
        searchActions
          .executeVerticalQuery()
          .then((res) =>
            query
              ? vert === "devices" &&
                setResults(res?.verticalResults.results[0])
              : setResults(undefined)
          ))
      : (searchActions.setUniversal(),
        searchActions.setUniversalLimit(universalLimit),
        searchActions
          .executeUniversalQuery()
          .then((res) =>
            query && res?.verticalResults[0].verticalKey === "devices"
              ? setResults(res?.verticalResults[0].results[0])
              : setResults(undefined)
          ));
  };

  return (
    <div className="w-full md:px-10 ">
      {!currentPath.id ||
      currentPath.id === "devices" ||
      currentPath.id === "all" ? (
        <SearchBar
          hideRecentSearches={true}
          customCssClasses={{
            searchBarContainer: "!mb-0 flex-1 searchBar",
            searchButton: "text-black",
          }}
          visualAutocompleteConfig={{
            entityPreviewSearcher: entityPreviewSearcher,
            includedVerticals: ["devices"],
            renderEntityPreviews: renderEntityPreviews,
            universalLimit: { devices: 4 },
            entityPreviewsDebouncingTime: 300,
          }}
          onSearch={handleSearch}
        />
      ) : (
        <SearchBar
          customCssClasses={{
            searchBarContainer: "!mb-0 flex-1 searchBar",
            searchButton: "text-black searchBar",
          }}
          hideRecentSearches={true}
          onSearch={handleSearch}
        />
      )}
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
        <div className="mx-auto">
          <div className="h-16 justify-between md:hidden flex items-center">
            <div className="ml-2 md:ml-6 flex gap-4 flex-1 items-center">
              {navbarItem
                .filter((filterItem) => {
                  if (currentPath.id === "all") {
                    return (
                      filterItem.id === "all" || filterItem.id === "devices"
                    );
                  } else {
                    return (
                      filterItem.id === "all" ||
                      filterItem.id === currentPath.id
                    );
                  }
                })
                .map((item) => (
                  <button
                    key={item.id}
                    className={`${
                      currentPath.id === item.id
                        ? "text-black border-b-4 border-[#ee0000]"
                        : "text-[#919393] border-transparent"
                    } inline-flex items-center px-1 pt-1 hover:border-primary-green border-b-2 md:text-lg font-medium`}
                    onClick={() => setCurrentPath(item)}
                  >
                    <div className="font-bold">{item.label}</div>
                  </button>
                ))}
              <div className="relative ml-auto mr-2">
                <div
                  className="text-[#919393] hover:cursor-pointer font-bold"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  More
                </div>
                {showDropdown && (
                  <ul className="absolute border shadow p-4 rounded-md flex flex-col right-0 bg-white z-10 w-[15.625rem]">
                    {navbarItem
                      .filter((filterItem) => {
                        if (currentPath.id === "all") {
                          return (
                            filterItem.id !== "all" &&
                            filterItem.id !== "devices"
                          );
                        } else {
                          return (
                            filterItem.id !== "all" &&
                            filterItem.id !== currentPath.id
                          );
                        }
                      })
                      .map((item) => (
                        <button
                          key={item.id}
                          className={`${
                            currentPath.id === item.id
                              ? "text-black border-b-4 border-[#ee0000]"
                              : "text-[#919393] border-transparent"
                          } inline-flex items-center px-1 pt-1 hover:border-primary-green border-b-2 md:text-lg font-medium`}
                          onClick={() => (
                            setCurrentPath(item), setShowDropdown(false)
                          )}
                        >
                          <li className="font-bold">{item.label ?? item.id}</li>
                        </button>
                      ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {currentPath && currentPath.id === "devices" ? (
        <ProductsGrid initVals={results} />
      ) : currentPath.id === "faqs" ? (
        <FAQsPage />
      ) : currentPath.id === "contactInfo" ? (
        <ContactInfoPage />
      ) : currentPath.id === "links" ? (
        <LinksPage />
      ) : currentPath.id === "locations" ? (
        <StoreLocator />
      ) : currentPath.id === "videos" ? (
        <VideosPage />
      ) : (
        <HomePage initVals={results} />
      )} */}
    </div>
  );
};

export default SearchPage;
