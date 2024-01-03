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

export enum LinkType {
	OTHER = "Other",
	URL = "URL",
	PHONE = "Phone",
	EMAIL = "Email",
}

export interface C_primaryCTA {
	label?: string,
	linkType?: LinkType,
	link?: string,
}

export interface EntityReference {
	entityId: string,
	name: string,
}

export interface C_secondaryCTA {
	label?: string,
	linkType?: LinkType,
	link?: string,
}

export interface ComplexImage {
	image: Image,
	details?: string,
	description?: string,
	clickthroughUrl?: string,
}

export default interface Ce_vendor {
	description?: string,
	name: string,
	c_commodityCode?: string,
	c_contractVehicles?: string[],
	c_currentVendor?: boolean,
	c_image?: Image,
	c_invoiceDate?: string,
	c_invoiceNumber?: string,
	c_pONumber?: string,
	c_primaryCTA?: C_primaryCTA,
	c_relatedOrders?: EntityReference[],
	c_relatedProduct?: EntityReference[],
	c_secondaryCTA?: C_secondaryCTA,
	c_vendorID?: string,
	c_vendorProducts?: string[],
	photoGallery?: ComplexImage[],
	id: string,
}
