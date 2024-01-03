export interface ImageThumbnail {
	url: string,
	width: number,
	height: number,
}

export interface Image {
	url: string,
	width: number,
	height: number,
	thumbnails?: ImageThumbnail[],
	alternateText?: string,
}

export interface EntityReference {
	entityId: string,
	name: string,
}

export default interface Ce_transaction {
	datePosted?: string,
	description?: string,
	name: string,
	c_cost?: number,
	c_image?: Image,
	c_quantity?: number,
	c_relatedProduct?: EntityReference[],
	c_relatedVendors?: EntityReference[],
	id: string,
}
