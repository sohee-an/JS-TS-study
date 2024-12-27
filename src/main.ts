import { setupProducts, getProductElement } from "./products";
import { findElement } from "./utiles";
import { setupCounter } from "./counter";
import "./style.css";
import { setupCart } from "./cart";

async function main(): Promise<void> {
  const { updateCount: updateProductCount, getProductById } =
    await setupProducts({
      container: document.querySelector("#products"),
      onDecreaseClick: onDecreaseClick,
      onIncreseClick: onIncreseClick,
    });

  const {
    addProduct: addProductToCart,
    removeProduct: removeProductFromCart,
    updateCount: updateCartCount,
  } = setupCart({
    container: document.querySelector(".cart_items"),
    onDecreaseClick: onDecreaseClick,
    onIncreseClick: onIncreseClick,
  });

  // 이부분이 프로덕트에도 쓰이고 카트에서도 쓰이지 않을까 => 데코레이터 패턴으로 묶어서
  // const countMap: ICountMap = {};

  const { increase, decrease, getTotalCount } = setupCounter();

  const updateTotalCount = (totalCount: any) => {
    const totlaCountElement = document.querySelector(".total_count")!;
    totlaCountElement.innerHTML = totalCount.toString();
  };

  function onIncreseClick({ productId }: { productId: string }): void {
    const count = increase({ productId });

    updateProductCount({ productId, count });
    if (count === 1) {
      addProductToCart({ product: getProductById({ productId }) });
    }
    updateCartCount({ productId, count });
    updateTotalCount(getTotalCount());
    // updateCart();
  }

  function onDecreaseClick({ productId }: { productId: string }): void {
    const count = decrease({ productId });

    updateProductCount({ productId, count });
    if (count === 0) {
      removeProductFromCart({ product: getProductById({ productId }) });
    }
    updateCartCount({ productId, count });
    updateTotalCount(getTotalCount());
    // updateCart();
  }

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
        onDecreaseClick({ productId });
        // decreaseCount(productId);
      } else if (targetElement.matches(".btn-increase")) {
        onIncreseClick({ productId });
        // increaseCount(productId);
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
