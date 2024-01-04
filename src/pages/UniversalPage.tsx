import {
  ResultsCount,
  AppliedFilters,
  UniversalResults,
  DirectAnswer,
  StandardCard,
} from "@yext/search-ui-react";
import ProductCard from "../components/Cards/ProductCard";
import {
  UniversalLimit,
  useSearchActions,
  useSearchState,
} from "@yext/search-headless-react";
import { useEffect } from "react";
import Loader from "../components/Loader";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { CiShop, CiShoppingCart } from "react-icons/ci";
import VendorCard from "../components/Cards/VendorCard";
import InvoiceCard from "../components/Cards/InvoiceCard";
import POCard from "../components/Cards/POCard";
import { RiBillLine } from "react-icons/ri";
const UniversalPage = () => {
  const searchActions = useSearchActions();
  const loading = useSearchState((state) => state.searchStatus.isLoading);
  const universalLimit: UniversalLimit = {
    products: 5,
    vendors: 5,
    invoices: 5,
    purchase_orders: 5,
  };
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const query = urlSearchParams.get("query");
    query && searchActions.setQuery(query);
    searchActions.setUniversalLimit(universalLimit);
    searchActions.setUniversal();
    searchActions.executeUniversalQuery();
  }, []);
  const FlexSection = ({ results, CardComponent, header }: any) => {
    if (!CardComponent) {
      return <div>Missing Card Component</div>;
    }
    let label = header.props.label;
    return (
      <div>
        <div className="flex items-center ">
          {label === "Vendors" ? (
            <CiShop className="h-6 w-6" />
          ) : label === "Products" ? (
            <CiShoppingCart className="h-6 w-6" />
          ) : label === "Purchase Orders" ? (
            <RiBillLine className="h-6 w-6" />
          ) : (
            <LiaFileInvoiceDollarSolid className="h-6 w-6" />
          )}
          {header}
        </div>
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
              sectionHeaderIconContainer: "hidden",
              sectionHeaderLabel: "-mb-4",
            }}
            verticalConfigMap={{
              products: {
                CardComponent: ProductCard,
                SectionComponent: FlexSection,
                label: "Products",
                viewAllButton: true,
              },
              vendors: {
                CardComponent: VendorCard,
                SectionComponent: FlexSection,
                label: "Vendors",
                viewAllButton: true,
              },
              invoices: {
                CardComponent: InvoiceCard,
                SectionComponent: FlexSection,
                label: "Invoices",
                viewAllButton: true,
              },
              purchase_orders: {
                CardComponent: POCard,
                SectionComponent: FlexSection,
                label: "Purchase Orders",
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
