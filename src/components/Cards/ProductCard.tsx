import { CardProps } from "@yext/search-ui-react";
import Product from "../../types/products";

const ProductCard = (props: CardProps<Product>) => {
  const { result } = props;
  const { name, id } = result;
  const { price, c_supplierName, sku, c_relatedVendors, c_primaryCTA } =
    result.rawData;
  return (
    <div className="flex w-full py-4 border justify-between items-center gap-4">
      <div className="flex justify-center ">
        <div className="flex flex-col border py-6 px-8 text-xl font-bold justify-center items-center">
          <div>$</div>
          {price?.value ? (
            <div>{price?.value}</div>
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
              <div>SKU #: {id}</div>
              <div>|</div>
              <div>Supplier Name : {c_supplierName}</div>
            </div>
          </div>
        </div>

        {c_relatedVendors && (
          <>
            <div className="my-2">Vendors</div>
            <div className="flex flex-col">
              {c_relatedVendors.map((item: any, index: any) => (
                <div key={index} className="text-sm">
                  {item.name}
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
