export default interface ShippingMethodType {
    _id: string;
    name: string;
    slug: string;
    description: string;
    minimum_amount: number;
    created_at: Date;
    updated_at: Date;
}