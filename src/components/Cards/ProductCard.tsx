import { CardProps } from "@yext/search-ui-react";
import Product from "../../types/products";

const ProductCard = (props: CardProps<Product>) => {
  const { result } = props;
  const { name, id } = result;
  const {
    price,
    c_supplierName,
    sku,
    c_relatedVendors,
    c_primaryCTA,
    c_partNumber,
    c_manufacturerName,
  } = result.rawData;
  return (
    <div className="flex w-full py-4 border justify-between items-center gap-4">
      <div className="flex justify-center w-1/6">
        <div className="flex max-w-[150px] w-full flex-col border py-6 px-4 text-xl font-bold justify-center items-center">
          {price?.value ? (
            <div>${price?.value}</div>
          ) : (
            <div className="text-sm">On Request</div>
          )}
        </div>
      </div>
      <div className="flex-1">
        <div className="flex flex-col gap-4 justify-start break-words">
          <div className="flex flex-col gap-2">
            <div className="text-xl font-bold">{name}</div>
            <div className="flex gap-1">
              <div>
                <span className="font-semibold">SKU # : </span>
                {id}
              </div>
              {c_supplierName && (
                <>
                  <div>|</div>
                  <div>
                    <span className="font-semibold"> Supplier Name : </span>
                    {c_supplierName}
                  </div>
                </>
              )}
            </div>
            <div className="flex gap-1">
              {c_partNumber && (
                <div>
                  <span className="font-semibold">Part # : </span>
                  {c_partNumber}
                </div>
              )}
              {c_manufacturerName && (
                <>
                  {" "}
                  <div>|</div>
                  <div>
                    <span className="font-semibold">Manufacturer Name : </span>
                    {c_manufacturerName}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {c_relatedVendors && (
          <>
            <div className="mt-2 font-medium">Vendors</div>
            <div className="flex flex-col">
              {c_relatedVendors.map((item: any, index: any) => (
                <div key={index} className="text-sm">
                  <a
                    className="hover:underline"
                    href={`/search.html?vertical=vendors&query=${item.name}`}
                  >
                    {item.name}
                  </a>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="w-1/4">
        {c_primaryCTA && (
          <a
            href={c_primaryCTA.link}
            className="py-2 text-sm px-2 border text-white bg-black hover:bg-white hover:border-black hover:text-black"
          >
            {c_primaryCTA.label}
          </a>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
