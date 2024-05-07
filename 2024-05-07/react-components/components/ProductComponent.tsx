import type { Product } from "./ProductList";

type ProductComponentProps = {
    product: Product;
}

export default function ProductComponent({ product }: ProductComponentProps) {
  return <div>
    <h3>{product.title} [{product.id}]</h3>
    <div>{product.description}</div>
  </div>;
}
