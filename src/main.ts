import { getProducts } from "./api";
import { setupProducts, getProductHTML } from "./products";
import { setupCounter } from "./counter";
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

async function main(): Promise<void> {
  const { updateCount } = await setupProducts({
    container: document.querySelector("#products"),
  });

  // 이부분이 프로덕트에도 쓰이고 카트에서도 쓰이지 않을까 => 데코레이터 패턴으로 묶어서
  const countMap: CountMap = {};

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
    updateCount({ productId, count: countMap[productId] });
    updateCart();
  };

  const decreaseCount = (productId: string): void => {
    if (countMap[productId] === undefined) {
      countMap[productId] = 0;
    }
    countMap[productId] -= 1;
    updateCount({ productId, count: countMap[productId] });
    updateCart();
  };

  const productsElement = document.querySelector<HTMLElement>("#products");
  if (!productsElement) return;

  // productsElement.innerHTML = products
  //   .map((product: Product) => getProductHTML(product))
  //   .join("");

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
