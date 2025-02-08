export default interface ShippingZoneType {
    _id: string;
    name: string;
    shippingMethods: Array<string>;
    countries: Array<string>;
    created_at: Date;
    updated_at: Date;
}