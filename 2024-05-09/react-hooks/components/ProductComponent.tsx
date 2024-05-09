import { Product } from "@/lib/products";

type ProductComponentProps = {
  product: Product;
};

export default function ProductComponent({ product }: ProductComponentProps) {
  const { title, description, id } = product;
  return (
    <div>
      <h3>
        {title} [{id}]
      </h3>
      <div>{description}</div>
    </div>
  );
}
