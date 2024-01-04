export interface Address {
	line1?: string,
	line2?: string,
	line3?: string,
	sublocality?: string,
	city?: string,
	region?: string,
	postalCode?: string,
	extraDescription?: string,
	countryCode?: string,
}

export interface Coordinate {
	latitude?: number,
	longitude?: number,
}

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
	address?: Address,
	description?: string,
	name: string,
	cityCoordinate?: Coordinate,
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
	displayCoordinate?: Coordinate,
	dropoffCoordinate?: Coordinate,
	photoGallery?: ComplexImage[],
	geocodedCoordinate?: Coordinate,
	pickupCoordinate?: Coordinate,
	routableCoordinate?: Coordinate,
	id: string,
	walkableCoordinate?: Coordinate,
	yextDisplayCoordinate?: Coordinate,
	yextDropoffCoordinate?: Coordinate,
	yextPickupCoordinate?: Coordinate,
	yextRoutableCoordinate?: Coordinate,
	yextWalkableCoordinate?: Coordinate,
}
