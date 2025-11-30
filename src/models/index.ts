// 인증 관련 타입
export interface AuthSignInDto {
  email: string;
  password: string;
}

export interface SessionMember {
  id: number;
  email: string;
  name: string;
  authority: Authority;
}

export enum Authority {
  GENERAL_MEMBER = "GENERAL_MEMBER",
  SELLING_MEMBER = "SELLING_MEMBER",
  ADMIN_MEMBER = "ADMIN_MEMBER",
}

// 회원 관련 타입
export interface MemberRegisterDto {
  email: string;
  password: string;
  name: string;
}

export interface MemberResponseDto {
  id: number;
  email: string;
  name: string;
  isDeleted: boolean;
}

export interface MemberNameUpdateDto {
  name: string;
}

export interface MemberPasswordUpdateDto {
  currentPassword: string;
  newPassword: string;
}

// 상품 관련 타입
export interface ProductCreateDto {
  name: string;
  price: number;
  stock: number;
  categoryId: number;
}

export interface ProductUpdateDto {
  name: string;
  price: number;
  stock: number;
  categoryId: number;
}

export interface ProductResponseDto {
  id: number;
  name: string;
  price: number;
  stock: number;
  categoryId: number;
  sellerId: number;
  sellerName: string;
  categoryName: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export enum Sorter {
  CREATED_AT_DESC = "CREATED_AT_DESC",
  CREATED_AT_ASC = "CREATED_AT_ASC",
  PRICE_DESC = "PRICE_DESC",
  PRICE_ASC = "PRICE_ASC",
  NAME_ASC = "NAME_ASC",
  NAME_DESC = "NAME_DESC",
}

// 카테고리 관련 타입
export interface CategoryRequestDto {
  name: string;
}

export interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

// 주문 관련 타입
export interface OrderRequestDto {
  memberId: number;
  paymentMethod: string;
  paymentAmount: number;
  deliveryCost: number;
  orderDetails: OrderDetailRequestDto[];
}

export interface OrderDetailRequestDto {
  productId: number;
  productCount: number;
}

export interface OrderResponseDto {
  id: number;
  memberId: number;
  memberName: string;
  orderDetails: OrderDetailResponseDto[];
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderDetailResponseDto {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  status: OrderDetailStatus;
}

export interface OrderDetailStatusUpdateDto {
  orderDetailId: number;
  status: OrderDetailStatus;
}

export enum OrderDetailStatus {
  PAYMENT_PENDING = "PAYMENT_PENDING",
  PAYMENT_COMPLETED = "PAYMENT_COMPLETED",
  SHIPPING = "SHIPPING",
  DELIVERED = "DELIVERED",
  PAYMENT_CANCELED = "PAYMENT_CANCELED",
}

// 판매자 관련 타입
export interface SellerRegisterDto {
  name: string;
  description: string;
  address: string;
  phone: string;
}

export interface SellerUpdateDto {
  name: string;
  description: string;
  address: string;
  phone: string;
}

export interface SellerResponseDto {
  id: number;
  memberId: number;
  name: string;
  description: string;
  address: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}
