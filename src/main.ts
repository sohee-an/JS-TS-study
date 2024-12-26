import { setupProducts, getProductElement } from "./products";
import { setupCounter } from "./counter";
import "./style.css";
import { ICountMap } from "./types/mainType";
import { setupCart } from "./cart";

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

// function sumAllCounts(countMap: ICountMap): number {
//   let sum = 0;
//   Object.values(countMap).forEach((number) => {
//     sum += number;
//   });
//   return sum;

//   // Alternative using reduce
//   // return Object.values(countMap).reduce((total, current) => {
//   //   total += current;
//   //   return total;
//   // }, 0);
// }

async function main(): Promise<void> {
  const { updateCount: updateProductCount, getProductById } =
    await setupProducts({
      container: document.querySelector("#products"),
    });

  const {
    addProduct,
    removeProduct,
    updateCount: updateCartCount,
  } = setupCart({ container: document.querySelector(".cart_items") });

  // 이부분이 프로덕트에도 쓰이고 카트에서도 쓰이지 않을까 => 데코레이터 패턴으로 묶어서
  // const countMap: ICountMap = {};

  const { increase, decrease, getTotalCount } = setupCounter();

  const updateTotalCount = (totalCount: any) => {
    const totlaCountElement = document.querySelector(".total_count")!;
    totlaCountElement.innerHTML = totalCount.toString();
  };

  const increaseCount = (productId: string): void => {
    const count = increase({ productId });

    updateProductCount({ productId, count });
    if (count === 1) {
      addProduct({ product: getProductById({ productId }) });
    }
    updateCartCount({ productId, count });
    updateTotalCount(getTotalCount());
    // updateCart();
  };

  const decreaseCount = (productId: string): void => {
    const count = decrease({ productId });

    updateProductCount({ productId, count });
    if (count === 0) {
      removeProduct({ product: getProductById({ productId }) });
    }
    updateCartCount({ productId, count });
    updateTotalCount(getTotalCount());
    // updateCart();
  };

  const productsElement = document.querySelector<HTMLElement>("#products");

  productsElement?.addEventListener("click", (event) => {
    const targetElement = event.target as HTMLElement;
    const productElement = findElement(targetElement, ".product");

    const productId = productElement?.getAttribute("data-product-id")!;

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

  cartItemsElement?.addEventListener("click", (event) => {
    console.log("aaa", event.target);
    const targetElement = event.target as HTMLElement;
    const productElement = findElement(targetElement, ".product")!;

    const productId = productElement.getAttribute("data-product-id")!;
    console.log("p", productId);

    if (
      targetElement.matches(".btn-decrease") ||
      targetElement.matches(".btn-increase")
    ) {
      if (targetElement.matches(".btn-decrease")) {
        decreaseCount(productId);
      } else if (targetElement.matches(".btn-increase")) {
        console.log("hello");
        increaseCount(productId);
      }
    }
  });

  const btnCartElement = document.querySelector<HTMLElement>(".btn-cart");

  const btnCloseCartElement =
    document.querySelector<HTMLElement>(".btn-close-cart")!;
  const cartDimmedBgElement =
    document.querySelector<HTMLElement>(".cart-dimmed-bg")!;

  // if (!btnCartElement || !btnCloseCartElement || !cartDimmedBgElement) return;

  btnCartElement?.addEventListener("click", () => {
    document.body.classList.add("displaying_cart");
  });

  btnCloseCartElement.addEventListener("click", () => {
    document.body.classList.remove("displaying_cart");
    console.log("hi");
  });

  cartDimmedBgElement.addEventListener("click", () => {
    document.body.classList.remove("displaying_cart");
  });
}

main();
