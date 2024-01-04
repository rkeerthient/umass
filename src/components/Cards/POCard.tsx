import { CardProps } from "@yext/search-ui-react";
import Ce_purchaseOrder from "../../types/purchase_orders";

const POCard = (props: CardProps<Ce_purchaseOrder>) => {
  const { result } = props;
  const { name, id } = result;
  const {
    c_unitPrice,
    c_relatedVendors,
    c_relatedPurchaseOrder,
    c_commodityCode,
  } = result.rawData;
  return (
    <div className="flex w-full py-4 border justify-between items-center gap-4">
      <div className="flex justify-center w-1/6">
        <div className="flex max-w-[150px] w-full flex-col border py-6 px-8 text-xl font-bold justify-center items-center">
          <div>$</div>
          {c_unitPrice ? (
            <div>{c_unitPrice}</div>
          ) : (
            <div className="text-sm">On Request</div>
          )}
        </div>
      </div>
      <div className="flex-1">
        <div className="flex flex-col gap-4 justify-start break-words">
          <div className="flex flex-col gap-2">
            <div className="text-xl font-bold">{name}</div>
            {c_commodityCode && (
              <div>
                <span className="font-medium">Commodity Code: </span>
                {c_commodityCode}
              </div>
            )}
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
        {c_relatedPurchaseOrder && (
          <>
            <div className="mt-2 font-medium">Vendors</div>
            <div className="flex flex-col">
              {c_relatedPurchaseOrder.map((item: any, index: any) => (
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
          </>
        )}
      </div>
      <div className="  text-right pr-8">
        <a
          href={"#"}
          className="py-2 w-fit mx-auto text-sm px-2 border text-white bg-black hover:bg-white hover:border-black hover:text-black"
        >
          View Invoice
        </a>
      </div>
    </div>
  );
};

export default POCard;
