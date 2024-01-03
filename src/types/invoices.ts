export interface EntityReference {
	entityId: string,
	name: string,
}

export default interface Ce_invoice {
	name: string,
	c_amount?: number,
	c_categoryLevelI?: string[],
	c_categoryLevelII?: string[],
	c_commodityCode?: string,
	c_invoiceDate?: string,
	c_invoiceNumber?: string,
	c_invoiceOwner?: string,
	c_manufacturerName?: string,
	c_pONumber?: string,
	c_relatedPurchaseOrder?: EntityReference[],
	c_relatedVendors?: EntityReference[],
	c_supplierName?: string,
	id: string,
}
