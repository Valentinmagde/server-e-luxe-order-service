export default interface ShippingPriceType {
    _id: string;
    departure: string;
    arrival: string;
    price: number;
    tax: number;
    created_at: Date;
    updated_at: Date;
}