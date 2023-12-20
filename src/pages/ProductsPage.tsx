import {
  DisplayableFacet,
  useSearchActions,
  useSearchState,
} from "@yext/search-headless-react";
import {
  ResultsCount,
  AppliedFilters,
  Pagination,
  VerticalResults,
  Geolocation,
  StandardCard,
  Facets,
  NumericalFacet,
} from "@yext/search-ui-react";
import { useEffect } from "react";
import Loader from "../components/Loader";
import SortDropdown from "../components/SortDropdown";

const ProductsPage = () => {
  const searchActions = useSearchActions();
  const loading = useSearchState((state) => state.searchStatus.isLoading);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const query = urlSearchParams.get("query");
    query && searchActions.setQuery(query);
    searchActions.setVertical("products");
    searchActions.executeVerticalQuery();
  }, []);

  const transformPriceFacet = (
    options: DisplayableFacet["options"]
  ): DisplayableFacet["options"] => {
    return options.map((option) => {
      const [start, end] = option.displayName.split("-");
      let displayName = "";
      if (start) {
        displayName = `$${start.trim()}`;
      }
      if (end) {
        displayName = displayName + ` - $${end.trim()}`;
      } else {
        displayName = "> " + displayName;
      }
      return {
        ...option,
        displayName,
      };
    });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className={`flex mt-4 `}>
            <div className="w-72 mr-5 hidden md:block">
              <Facets customCssClasses={{ facetsContainer: "mr-10" }}>
                <NumericalFacet
                  fieldId="c_price.value"
                  label="Price"
                  transformOptions={transformPriceFacet}
                />
              </Facets>
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

export default ProductsPage;
