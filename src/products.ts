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
        <button type="button" class="btn-decrease disabled:cursor-not-allowed disabled:opacity-50 bg-green-200 hover:bg-green-300 text-green-800 py-1 px-3 rounded-full">-</button>
        <span class="cart-count text-green-800">${
          count === 0 ? "" : count
        }</span>
        <button type="button" class="btn-increase bg-green-200 hover:bg-green-300 text-green-800 py-1 px-3 rounded-full">+</button>
      </div>
    </div>

`;
  return element;
}

export async function setupProducts({
  container,
}: {
  container: HTMLElement | null;
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

  const updateCount = ({
    productId,
    count,
  }: {
    productId: string;
    count: number;
  }): void => {
    const productElement = container?.querySelector<HTMLElement>(
      `.product[data-product-id='${productId}']`
    );
    if (!productElement) return;

    const cartCountElement = productElement.querySelector(".cart-count");
    if (!cartCountElement) return;

    cartCountElement.innerHTML = count === 0 ? "" : String(count);
  };

  const getProductById = ({ productId }: { productId: string }) => {
    return productMap[productId];
  };
  return { updateCount, getProductById };
}
