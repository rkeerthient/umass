import { CardProps } from "@yext/search-ui-react";
import Ce_vendor from "../../types/vendors";

const VendorCard = (props: CardProps<Ce_vendor>) => {
  const { result } = props;
  const { name } = result;
  const { c_relatedOrders, c_relatedProduct, address } = result.rawData;

  return (
    <div className=" w-full p-4 border justify-between items-center  grid grid-cols-3 gap-4">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-bold">{name}</div>
        <div className="flex flex-col">
          <div>{address?.line1}</div>
          <div>
            {address?.city}, {address?.region} {address?.postalCode}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {c_relatedOrders && (
          <div className="flex flex-col">
            <div className="font-semibold">Related Orders</div>
            <div className="flex flex-col  h-28 overflow-auto">
              {c_relatedOrders?.map((item, index) => (
                <div key={index} className="text-sm">
                  <a
                    className="hover:underline"
                    href={`/search.html?vertical=orders&query=${item.name}`}
                  >
                    {item.name}
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
        {c_relatedProduct && (
          <div className="flex flex-col">
            <div className="font-semibold">Related Product</div>{" "}
            {c_relatedProduct?.map((item, index) => (
              <div key={index} className="text-sm">
                <a
                  className="hover:underline"
                  href={`/search.html?vertical=products&query=${item.name}`}
                >
                  {item.name}
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="  text-right pr-8">
        <a
          href={"#"}
          className="py-2 w-fit mx-auto text-sm px-2 border text-white bg-black hover:bg-white hover:border-black hover:text-black"
        >
          View Vendor Details
        </a>
      </div>
    </div>
  );
};

export default VendorCard;
