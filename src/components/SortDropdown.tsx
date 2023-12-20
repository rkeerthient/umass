import {
  Direction,
  SortBy,
  SortType,
  useSearchActions,
  useSearchState,
} from "@yext/search-headless-react";
import { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

const sortByOptions: { label: string; sortBy: SortBy }[] = [
  {
    label: "Name: A-Z",
    sortBy: {
      field: "name",
      direction: Direction.Ascending,
      type: SortType.Field,
    },
  },
  {
    label: "Name: Z-A",
    sortBy: {
      field: "name",
      direction: Direction.Descending,
      type: SortType.Field,
    },
  },
  {
    label: "Price: High-Low",
    sortBy: {
      field: "c_price.value",
      direction: Direction.Ascending,
      type: SortType.Field,
    },
  },
  {
    label: "Price: Low-High",
    sortBy: {
      field: "c_price.value",
      direction: Direction.Descending,
      type: SortType.Field,
    },
  },
];

const SortDropdown = (): JSX.Element | null => {
  const [open, setOpen] = useState(false);

  const sortBys = useSearchState((state) => state.vertical.sortBys);
  const resultsCount =
    useSearchState(
      (state) =>
        state.vertical.resultsCount ||
        state.vertical.noResults?.allResultsForVertical.resultsCount
    ) ?? 0;

  const searchActions = useSearchActions();

  const selectedSort = sortByOptions.find(
    (s) =>
      s.sortBy.field === sortBys?.[0]?.field &&
      s.sortBy.direction === sortBys?.[0]?.direction
  );

  const handleTileClick = (sortBy: SortBy) => {
    searchActions.setSortBys([sortBy]);
    searchActions.executeVerticalQuery();
    setOpen(false);
  };

  return resultsCount ? (
    <div className="relative text-sm">
      <div className="flex h-10 w-48 items-center justify-between border px-2">
        <div className="text-sm">
          <div className="font-semibold">Sort By:</div>
          <div>{selectedSort?.label}</div>
        </div>
        <button onClick={() => setOpen(!open)}>
          {open ? <BiChevronUp /> : <BiChevronDown />}
        </button>
      </div>
      <ul className="absolute border">
        {open &&
          sortByOptions
            .filter((s) => s.sortBy !== selectedSort?.sortBy)
            .map((s) => (
              <li onClick={() => handleTileClick(s.sortBy)}>
                <div className="flex h-10 w-48 items-center px-2 bg-white hover:bg-gray-300">
                  {s.label}
                </div>
              </li>
            ))}
      </ul>
    </div>
  ) : null;
};

export default SortDropdown;
