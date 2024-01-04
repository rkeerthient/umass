import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import {
  ResultsCount,
  AppliedFilters,
  Pagination,
  VerticalResults,
  Geolocation,
  StandardCard,
  Facets,
  FilterSearch,
} from "@yext/search-ui-react";
import { useEffect } from "react";
import Loader from "../components/Loader";
import SortDropdown from "../components/SortDropdown";
import VendorCard from "../components/Cards/VendorCard";

const VendorsPage = () => {
  const searchActions = useSearchActions();
  const loading = useSearchState((state) => state.searchStatus.isLoading);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const query = urlSearchParams.get("query");
    query && searchActions.setQuery(query);
    searchActions.setVertical("vendors");
    searchActions.executeVerticalQuery();
  }, []);

  const handleSelect = () => {};

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className={`flex flex-col gap-4 mt-4 `}>
            <div className="my-4 w-full">
              <div className="w-2/3 mx-auto">
                <FilterSearch
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
