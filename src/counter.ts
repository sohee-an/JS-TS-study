import { bindReactiveState } from "./reactivity";

// 상품의 카운터를 담당하는 함수
export function setupCounter() {
  const [getCountMap, setCountMap] = bindReactiveState({
    name: "countMap",
    defaultValue: {},
  });

  const increase = ({ productId }: { productId: string }) => {
    const newCountMap = { ...getCountMap() };
    if (newCountMap[productId] === undefined) {
      newCountMap[productId] = 0;
    }
    newCountMap[productId] += 1;
    setCountMap(newCountMap);

    return newCountMap[productId];
  };

  const decrease = ({ productId }: { productId: string }) => {
    const newCountMap = { ...getCountMap() };
    if (newCountMap[productId] === undefined) {
      newCountMap[productId] = 0;
    }

    newCountMap[productId] -= 1;
    setCountMap(newCountMap);

    return newCountMap[productId];
  };

  const getTotalCount = () => {
    let sum = 0;
    Object.values(getCountMap()).forEach((number) => {
      sum += number;
    });
    return sum;
  };

  // const addChangeListner = (callback) => {
  //   callbacks.push(callback);
  // };
  return {
    increase,
    decrease,
    getTotalCount,
  };
}
