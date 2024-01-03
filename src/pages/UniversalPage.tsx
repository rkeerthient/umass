import {
  ResultsCount,
  AppliedFilters,
  UniversalResults,
  DirectAnswer,
  StandardCard,
} from "@yext/search-ui-react";
import ProductCard from "../components/Cards/ProductCard";
import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import { useEffect } from "react";
import Loader from "../components/Loader";

const UniversalPage = () => {
  const searchActions = useSearchActions();
  const loading = useSearchState((state) => state.searchStatus.isLoading);
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const query = urlSearchParams.get("query");
    query && searchActions.setQuery(query);
    // searchActions.setUniversalLimit(universalLimit);
    searchActions.setUniversal();
    searchActions.executeUniversalQuery();
  }, []);
  const FlexSection = ({ results, CardComponent, header }: any) => {
    if (!CardComponent) {
      return <div>Missing Card Component</div>;
    }
    return (
      <div>
        <div>{header}</div>
        <div className="flex flex-col gap-4">
          {results.map((r: any, index: number) => (
            <CardComponent key={index} result={r} />
          ))}
        </div>
      </div>
    );
  };
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <DirectAnswer customCssClasses={{ answerContainer: "my-4" }} />
          <ResultsCount />
          <AppliedFilters
            customCssClasses={{ appliedFiltersContainer: `!flex flex-row` }}
          ></AppliedFilters>
          <UniversalResults
            showAppliedFilters={true}
            customCssClasses={{
              universalResultsContainer: "w-full mx-auto my-6 ",
            }}
            verticalConfigMap={{
              devices: {
                CardComponent: ProductCard,
                SectionComponent: FlexSection,
                label: "Products",
                viewAllButton: true,
              },
              vendors: {
                CardComponent: StandardCard,
                SectionComponent: FlexSection,
                label: "Vendors",
                viewAllButton: true,
              },
              invoices: {
                CardComponent: StandardCard,
                SectionComponent: FlexSection,
                label: "Invoices",
                viewAllButton: true,
              },
            }}
          />
        </>
      )}
    </div>
  );
};

export default UniversalPage;
