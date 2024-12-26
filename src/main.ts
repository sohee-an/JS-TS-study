import { getProducts } from "./api";
import "./style.css";
import { Product, ProductMap, CountMap } from "./types/mainType";

function findElement(
  startingElement: HTMLElement,
  selector: string
): HTMLElement | null {
  let currentElement: HTMLElement | null = startingElement;
  while (currentElement) {
    if (currentElement.matches(selector)) {
      return currentElement;
    }
    currentElement = currentElement.parentElement;
  }
  return null;
}

function sumAllCounts(countMap: CountMap): number {
  let sum = 0;
  Object.values(countMap).forEach((number) => {
    sum += number;
  });
  return sum;

  // Alternative using reduce
  // return Object.values(countMap).reduce((total, current) => {
  //   total += current;
  //   return total;
  // }, 0);
}

function getProductHTML(product: Product, count: number = 0): string {
  return `
  <div class="product" data-product-id="${product.id}">
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
  </div>
`;
}

async function main(): Promise<void> {
  const products = await getProducts();
  const productMap: ProductMap = {};
  products.forEach((product: Product) => {
    productMap[product.id] = product;
  });
  const countMap: CountMap = {};

  const updateProductCount = (productId: string): void => {
    const productElement = document.querySelector<HTMLElement>(
      `.product[data-product-id='${productId}']`
    );
    if (!productElement) return;

    const cartCountElement = productElement.querySelector(".cart-count");
    if (!cartCountElement) return;

    cartCountElement.innerHTML =
      countMap[productId] === 0 ? "" : String(countMap[productId]);
  };

  const updateCart = (): void => {
    const productIds = Object.keys(countMap);
    const cartItemsElement = document.querySelector<HTMLElement>(".cart_items");
    const totalCountElement =
      document.querySelector<HTMLElement>(".total_count");

    if (!cartItemsElement || !totalCountElement) return;

    cartItemsElement.innerHTML = productIds
      .map((productId) => {
        const productInCart = productMap[productId];
        if (countMap[productId] === 0) {
          return "";
        }
        return getProductHTML(productInCart, countMap[productId]);
      })
      .join("");

    totalCountElement.innerHTML = `(${sumAllCounts(countMap)})`;
  };

  const increaseCount = (productId: string): void => {
    if (countMap[productId] === undefined) {
      countMap[productId] = 0;
    }
    countMap[productId] += 1;
    updateProductCount(productId);
    updateCart();
  };

  const decreaseCount = (productId: string): void => {
    if (countMap[productId] === undefined) {
      countMap[productId] = 0;
    }
    countMap[productId] -= 1;
    updateProductCount(productId);
    updateCart();
  };

  const productsElement = document.querySelector<HTMLElement>("#products");
  if (!productsElement) return;

  productsElement.innerHTML = products
    .map((product: Product) => getProductHTML(product))
    .join("");

  productsElement.addEventListener("click", (event) => {
    const targetElement = event.target as HTMLElement;
    const productElement = findElement(targetElement, ".product");
    if (!productElement) return;

    const productId = productElement.getAttribute("data-product-id");
    if (!productId) return;

    if (
      targetElement.matches(".btn-decrease") ||
      targetElement.matches(".btn-increase")
    ) {
      if (targetElement.matches(".btn-decrease")) {
        decreaseCount(productId);
      } else if (targetElement.matches(".btn-increase")) {
        increaseCount(productId);
      }
    }
  });

  const cartItemsElement = document.querySelector<HTMLElement>(".cart_items");
  if (!cartItemsElement) return;

  cartItemsElement.addEventListener("click", (event) => {
    const targetElement = event.target as HTMLElement;
    const productElement = findElement(targetElement, ".product");
    if (!productElement) return;

    const productId = productElement.getAttribute("data-product-id");
    if (!productId) return;

    if (
      targetElement.matches(".btn-decrease") ||
      targetElement.matches(".btn-increase")
    ) {
      if (targetElement.matches(".btn-decrease")) {
        decreaseCount(productId);
      } else if (targetElement.matches(".btn-increase")) {
        increaseCount(productId);
      }
    }
  });

  const btnCartElement = document.querySelector<HTMLElement>(".btn-cart");
  const btnCloseCartElement =
    document.querySelector<HTMLElement>(".btn-close-cart");
  const cartDimmedBgElement =
    document.querySelector<HTMLElement>(".cart-dimmed-bg");

  if (!btnCartElement || !btnCloseCartElement || !cartDimmedBgElement) return;

  btnCartElement.addEventListener("click", () => {
    document.body.classList.add("displaying_cart");
  });

  btnCloseCartElement.addEventListener("click", () => {
    document.body.classList.remove("displaying_cart");
  });

  cartDimmedBgElement.addEventListener("click", () => {
    document.body.classList.remove("displaying_cart");
  });
}

main();
