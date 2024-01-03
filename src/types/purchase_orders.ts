export interface EntityReference {
	entityId: string,
	name: string,
}

export default interface Ce_purchaseOrder {
	name: string,
	c_categoryLevelI?: string[],
	c_categoryLevelII?: string[],
	c_commodityCode?: string,
	c_relatedPurchaseOrder?: EntityReference[],
	c_relatedVendors?: EntityReference[],
	c_unitPrice?: number,
	id: string,
}
