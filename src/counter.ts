import { ICountMap } from "./types/mainType";

export function setupCounter() {
  const countMap: ICountMap = {};

  const increase = ({ productId }: { productId: string }) => {
    if (countMap[productId] === undefined) {
      countMap[productId] = 0;
    }
    countMap[productId] += 1;
    return countMap[productId];
  };

  const decrease = ({ productId }: { productId: string }) => {
    if (countMap[productId] === undefined) {
      countMap[productId] = 0;
    }
    countMap[productId] -= 1;

    return countMap[productId];
  };

  const getTotalCount = () => {
    let sum = 0;
    Object.values(countMap).forEach((number) => {
      sum += number;
    });
    return sum;
  };
  return {
    increase,
    decrease,
    getTotalCount,
  };
}
