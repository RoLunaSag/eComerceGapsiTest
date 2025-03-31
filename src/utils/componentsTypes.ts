import { DraggableProvided } from "react-beautiful-dnd";

export type ProductDetailsTypes = {
    name: string;
    image: string;
    canonicalUrl: string;
    priceInfo?: {
      linePriceDisplay?: string;
    };
    averageRating?: number;
    numberOfReviews?: number;
  };
  
export type ProductItemTypes = {
    product: ProductDetailsTypes;
    provided: DraggableProvided;
    onAddToCart: (product: ProductDetailsTypes) => void;
  };

export type CartProps = {
  items: ProductDetailsTypes[];
};