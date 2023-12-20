import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import {
  ResultsCount,
  AppliedFilters,
  Pagination,
  VerticalResults,
  Geolocation,
  StandardCard,
  Facets,
} from "@yext/search-ui-react";
import { useEffect } from "react";
import Loader from "../components/Loader";
import SortDropdown from "../components/SortDropdown";

const InvoicesPage = () => {
  const searchActions = useSearchActions();
  const loading = useSearchState((state) => state.searchStatus.isLoading);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const query = urlSearchParams.get("query");
    query && searchActions.setQuery(query);
    searchActions.setVertical("invoices");
    searchActions.executeVerticalQuery();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className={`flex mt-4 `}>
            <div className="w-72 mr-5 hidden md:block">
              <Facets customCssClasses={{ facetsContainer: "mr-10" }}></Facets>
            </div>
            <div className={`w-full `}>
              <div className="hidden md:flex w-full items-baseline justify-between">
                <ResultsCount />
                <SortDropdown />
              </div>
              <div className="flex justify-between mb-4">
                <AppliedFilters />
              </div>
              <div className="flex flex-col space-y-4 ">
                <VerticalResults
                  CardComponent={StandardCard}
                  customCssClasses={{
                    verticalResultsContainer: `grid grid-cols-1 md:grid-cols-3 gap-4`,
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

export default InvoicesPage;
