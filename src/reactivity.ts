type TProps = {
  name: "countMap" | string;
  defaultValue: Record<string, number>;
};

export function bindReactiveState({ name, defaultValue = {} }: TProps) {
  if (typeof defaultValue !== "object") {
    throw new Error("bindReactiveState supports only object as default value.");
  }

  // Proxy를 사용하여 value 객체 감시
  const value = new Proxy(defaultValue, {
    set(target, property: string, newValue, reactive) {
      console.log("pr", property, newValue, reactive);
      const oldValue = target[property];
      // 값이 실제로 변경된 경우에만 DOM 업데이트
      if (oldValue !== newValue) {
        target[property] = newValue;

        // DOM 업데이트
        const elements = Array.from(
          document.querySelectorAll(
            `[data-subscribe-to='${name}'][data-subscription-path='${property}']`
          )
        );
        elements.forEach((element: any) => {
          if (element.tagName === "INPUT") {
            element.value = newValue;
          } else {
            element.innerHTML = newValue;
          }
        });
      }
      return true;
    },
  });

  const getter = (): Record<string, number> => {
    return value;
  };

  const setter = (newValue: TProps["defaultValue"]) => {
    Object.keys(newValue).forEach((key) => {
      console.log("vvv", newValue[key], key);
      if (value[key] !== newValue[key]) {
        value[key] = newValue[key]; // Proxy의 set 트랩이 자동으로 호출됨
      }
    });
  };

  return [getter, setter] as const;
}
