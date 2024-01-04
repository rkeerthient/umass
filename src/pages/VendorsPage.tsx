import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import {
  ResultsCount,
  AppliedFilters,
  Pagination,
  VerticalResults,
  Geolocation,
  FilterSearch,
} from "@yext/search-ui-react";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import VendorCard from "../components/Cards/VendorCard";

const VendorsPage = () => {
  const searchActions = useSearchActions();
  const loading = useSearchState((state) => state.searchStatus.isLoading);
  const [showFilter, setShowFilter] = useState(false);
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const query = urlSearchParams.get("query");
    query && searchActions.setQuery(query);
    searchActions.setVertical("vendors");
    searchActions.executeVerticalQuery();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className={`flex flex-col gap-4 mt-4 `}>
            <div className="my-4 w-full">
              <div className=" mx-auto flex items-center gap-4 ">
                <div
                  className="border py-1 px-4 mt-1 bg-black text-white hover:cursor-pointer rounded-md"
                  onClick={() => setShowFilter(!showFilter)}
                >
                  {showFilter ? `Hide` : `Show`} advanced search
                </div>
                <div
                  className={`${showFilter ? `visible` : `invisible`} w-2/3`}
                >
                  <FilterSearch
                    customCssClasses={{ filterSearchContainer: "-mb-2" }}
                    placeholder="Seach vendor Locations"
                    searchOnSelect={true}
                    searchFields={[
                      {
                        entityType: "ce_vendor",
                        fieldApiName: "builtin.location",
                      },
                    ]}
                  />
                </div>
              </div>
            </div>

            <div className={`w-full `}>
              <div className="hidden md:flex w-full items-baseline justify-between">
                <ResultsCount />
                {/* <SortDropdown /> */}
              </div>
              <div className="flex justify-between mb-4">
                <AppliedFilters />
              </div>
              <div className="flex flex-col space-y-4 ">
                <VerticalResults
                  CardComponent={VendorCard}
                  customCssClasses={{
                    verticalResultsContainer: `flex  flex-col gap-4`,
                  }}
                />
                <div>
                  <Pagination />
                  <Geolocation />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default VendorsPage;
