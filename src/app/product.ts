export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  availabilityStatus: string;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}
