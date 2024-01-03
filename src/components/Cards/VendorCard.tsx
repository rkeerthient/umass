import { CardProps } from "@yext/search-ui-react";
import Ce_vendor from "../../types/vendors";

const VendorCard = (props: CardProps<Ce_vendor>) => {
  const { result } = props;
  const { name, id } = result;
  const { price, c_supplierName, sku, c_relatedVendors } = result.rawData;
  return (
    <div className="flex w-full p-4 border justify-between items-center gap-4">
      <div className="w-1/4 flex justify-center ">
        <div className="flex flex-col border py-6 px-8 text-xl font-bold justify-center items-center">
          <div>$</div>
          {price?.value ? (
            <div>{price?.value}</div>
          ) : (
            <div className="text-sm">On Request</div>
          )}
        </div>
      </div>
      <div className="w-3/4">
        <div className="flex flex-col gap-4 justify-start break-words">
          <div className="flex flex-col gap-2">
            <div className="text-xl font-bold">{name}</div>
            <div className="flex gap-1">
              <div>SKU #: {id}</div>
              <div>|</div>
              <div>Supplier Name : {c_supplierName}</div>
            </div>
          </div>
        </div>

        <div></div>
      </div>
      <div className="w-1/5">{`CTA`}</div>
    </div>
  );
};

export default VendorCard;
