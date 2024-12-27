import { getProducts } from "./api";
import { Product, ProductMap } from "./types/mainType";

export function getProductElement(
  product: Product,
  count: number = 0
): HTMLElement {
  const element = document.createElement("div");
  element.classList.add("product");
  element.setAttribute("data-product-id", product.id);
  element.innerHTML = `
    <img src="${product.images[0]}" alt="Image of ${product.name}" />
    <p>${product.name}</p>
    <div class="flex items-center justify-between">
      <span>Price: ${product.regularPrice}</span>
      <div>
        <button type="button"  ${
          count === 0 ? "disabled" : ""
        }  class="btn-decrease disabled:cursor-not-allowed disabled:opacity-50 bg-green-200 hover:bg-green-300 text-green-800 py-1 px-3 rounded-full">-</button>
        <span class="cart-count text-green-800" data-subscribe-to="countMap" data-subscription-path="${
          product.id
        }></span>
        <button type="button" class="btn-increase bg-green-200 hover:bg-green-300 text-green-800 py-1 px-3 rounded-full">+</button>
      </div>
    </div>

`;
  return element;
}

export async function setupProducts({
  container,
  onDecreaseClick,
  onIncreseClick,
}: {
  container: HTMLElement | null;
  onDecreaseClick: ({ productId }: { productId: string }) => void;
  onIncreseClick: ({ productId }: { productId: string }) => void;
}) {
  const products = await getProducts();
  const productMap: ProductMap = {};
  products.forEach((product: Product) => {
    productMap[product.id] = product;
  });

  const productsElement = document.querySelector<HTMLElement>("#products")!;

  products.forEach((product: Product) => {
    productsElement.appendChild(getProductElement(product));
  });

  container?.addEventListener("click", (event) => {
    const targetElement = event.target as HTMLElement;
    const productElement = targetElement.closest(".product");
    if (!productElement) return;

    const productId = productElement.getAttribute("data-product-id");
    if (!productId) return;

    if (targetElement.matches(".btn-decrease")) {
      onDecreaseClick({ productId });
    } else if (targetElement.matches(".btn-increase")) {
      onIncreseClick({ productId });
    }
  });

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
    // if (!productElement) return;

    const cartCountElement = productElement.querySelector(".cart-count")!;

    if (cartCountElement) {
      cartCountElement.innerHTML = count === 0 ? "0" : String(count);
    }

    console.log("count", count);
    const decreaseButton =
      productElement.querySelector<HTMLButtonElement>(".btn-decrease");
    if (decreaseButton) {
      decreaseButton.disabled = count === 0;
    }
  };

  const getProductById = ({ productId }: { productId: string }) => {
    return productMap[productId];
  };

  return { updateCount, getProductById };
}
