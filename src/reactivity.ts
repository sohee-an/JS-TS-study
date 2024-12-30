type TProps = {
  name: "countMap" | string;
  defaultValue: Record<string, number>;
};

export function bindReactiveState({ name, defaultValue = {} }: TProps) {
  if (typeof defaultValue !== "object") {
    throw new Error("bindReactiveState supports only object as default value.");
  }

  let value = defaultValue;

  const getter = () => {
    return value;
  };

  // 변화된걸를 찾기 위해서는 옛날 값과 새로운 값을 비교해야됨

  const setter = (newValue: TProps["defaultValue"]) => {
    const oldKeys = Object.keys(value);
    const newKeys = Object.keys(newValue);
    // console.log("oldKeys", oldKeys); //[1]
    // console.log("newKeys", newKeys); //[1,2]
    // const removedKeys = [];
    const changedKeys: string[] = [];
    /**
     * 1.옛날 값고 새로운 값 비교(값 비교)
     *  */
    newKeys.forEach((key) => {
      if (value[key] !== newValue[key]) {
        changedKeys.push(key);
      }
    });
    /**
     *  2.새로 상품 추가 확인
     */
    newKeys.forEach((key) => {
      if (!oldKeys.includes(key)) {
        changedKeys.push(key);
      }
    });

    const uniqueChangedKeys = Array.from(new Set(changedKeys));
    uniqueChangedKeys.forEach((key) => {
      const elements = Array.from(
        document.querySelectorAll(
          `[data-subscribe-to='${name}'][data-subscription-path='${key}']`
        )
      );
      // elements.forEach((element: any) => {
      //   if (element.tagName === "INPUT") {
      //     element.value = newValue[key];
      //   } else {
      //     element.innerHTML = newValue[key];
      //   }
      // });
    });

    value = newValue;
  };

  return [getter, setter];
}
