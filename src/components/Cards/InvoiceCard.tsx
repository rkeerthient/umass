import { CardProps } from "@yext/search-ui-react";
import Ce_invoice from "../../types/invoices";

const InvoiceCard = (props: CardProps<Ce_invoice>) => {
  const { result } = props;
  const { name } = result;
  const {
    c_relatedVendors,
    c_supplierName,
    c_invoiceDate,
    c_invoiceNumber,
    c_invoiceOwner,
    c_pONumber,
    c_relatedPurchaseOrder,
    c_amount,
  } = result.rawData;

  return (
    <div className="flex w-full py-4 border justify-between items-center gap-4">
      <div className="flex justify-center w-1/6">
        <div className="flex max-w-[150px] w-full flex-col border py-6 px-4 text-xl font-bold justify-center items-center">
          {c_amount ? (
            <div>${c_amount}</div>
          ) : (
            <div className="text-sm">On Request</div>
          )}
        </div>
      </div>
      <div className="flex-1">
        <div className="flex flex-col gap-4 justify-start break-words">
          <div className="flex flex-col gap-2">
            <div className="text-xl font-bold">{name}</div>
            <div className="flex flex-col gap-1">
              <div>
                <span className="font-semibold">Invoice #: </span>
                {c_invoiceNumber} | {c_invoiceDate} |{" "}
                <span className="font-semibold">Invoice Owner : </span>
                {c_invoiceOwner}
                <span className="font-semibold"></span>
              </div>
              <div>
                <span className="font-semibold">Supplier Name : </span>
                {c_supplierName}
              </div>
              <div>
                <span className="font-semibold">Purchase Order #: </span>
                {c_pONumber}
              </div>
            </div>
          </div>
        </div>

        {c_relatedVendors && (
          <>
            <div className="mt-2 font-semibold">Vendors</div>
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
            <div className="mt-2 font-semibold">Related Purchase Order</div>
            <div className="flex flex-col">
              {c_relatedPurchaseOrder.map((item: any, index: any) => (
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
    </div>
  );
};

export default InvoiceCard;
