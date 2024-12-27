import { getProductElement } from "./products";
import { Product } from "./types/mainType";

export function setupCart({ container }: { container: HTMLElement | null }) {
  const addProduct = ({ product }: { product: Product }) => {
    const productElement = getProductElement(product);
    container?.appendChild(productElement);
  };

  const removeProduct = ({ product }: { product: Product }) => {
    const productElement = container?.querySelector<HTMLElement>(
      `.product[data-product-id='${product.id}']`
    );
    productElement?.remove();
  };

  const updateCount = ({
    productId,
    count,
  }: {
    productId: string;
    count: number;
  }): void => {
    const productElement = container?.querySelector<HTMLElement>(
      `.product[data-product-id='${productId}']`
    )!;

    const cartCountElement = productElement.querySelector(".cart-count")!;
    console.log("p", cartCountElement);

    cartCountElement.innerHTML = count === 0 ? "" : count.toString();
  };

  return {
    addProduct,
    removeProduct,
    updateCount,
  };
}
