import { getProductElement } from "./products";
import { Product } from "./types/mainType";
import { findElement } from "./utiles";

export function setupCart({
  container,
  onDecreaseClick,
  onIncreseClick,
}: {
  container: HTMLElement | null;
  onDecreaseClick: ({ productId }: { productId: string }) => void;
  onIncreseClick: ({ productId }: { productId: string }) => void;
}) {
  container?.addEventListener("click", (event) => {
    const targetElement = event.target as HTMLElement;
    const productElement = findElement(targetElement, ".product")!;

    const productId = productElement.getAttribute("data-product-id")!;

    if (
      targetElement.matches(".btn-decrease") ||
      targetElement.matches(".btn-increase")
    ) {
      if (targetElement.matches(".btn-decrease")) {
        onDecreaseClick({ productId });
      } else if (targetElement.matches(".btn-increase")) {
        onIncreseClick({ productId });
      }
    }
  });

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
