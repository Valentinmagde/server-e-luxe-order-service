export default interface OrderType {
    _id: string;
    order_items: Array<OrderItem>;
    shipping_address: ShippingAddress;
    user_info: UserInfo;
    shipping_method: string;
    payment_method: string;
    payment_result: PaymentResult;
    items_price: number;
    shipping_price: number;
    tax_price: number;
    total_price: number;
    status: string;
    discount: number;
    shipping_option: string;
    card_info: object;
    invoice: number;
    cart: object;
    sub_total: number;
    shipping_cost: number;
    total: number;
    delivery_note: string;
    user: string;
    seller: string;
    order_number: number;
    is_paid: boolean;
    paid_at: string;
    is_delivered: boolean;
    delivered_at: string;
    created_at: string;
    updated_at: string;
}

interface OrderItem {
    name: string;
    title: any;
    qty: number;
    image: string;
    price: number;
    product: string;
}

interface ShippingAddress {
    full_name: string;
    company: string;
    state: string;
    address: any;
    city: string;
    postal_code: string;
    country: string;
    phone: string;
    email: string;
    latlatitude: number;
    longitude: number;
}

interface PaymentResult {
    id: string;
    status: string;
    update_time: string;
    email_address: string;
}

interface UserInfo {
    name: string;
    email: string;
    contact: string;
    address: string;
    city: string;
    country: string;
    zipCode: string;
}
