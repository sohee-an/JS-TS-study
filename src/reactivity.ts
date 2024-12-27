export function bindReactiveState({
  name,
  defaultValue,
}: {
  name: string;
  defaultValue: any;
}) {
  if (typeof defaultValue === "object") {
    throw new Error("object는 지원하지 않아요");
  }

  //   const value = { ...defaultValue };
  let value = defaultValue;

  const getter = () => {
    return value;
  };
  const setter = (newValue: any) => {
    const oldKeys = Object.keys(value);
    const newKeys = Object.keys(newValue);
    const changedKeys: string[] = [];
    //이거머야?
    newKeys.forEach((key) => {
      if (value[key] !== newValue[key]) {
        changedKeys.push(key);
      }
    });

    newKeys.forEach((key) => {
      if (!oldKeys.includes(key)) {
        changedKeys.push(key);
      }
    });
    const uniqueChangedKeys = Array.from(new Set(changedKeys));
    uniqueChangedKeys.forEach((key) => {
      const element = Array.from(
        document.querySelectorAll(
          `[data-subscirbe='${name}'][data-subscription-path='${key}]`
        )
      );
      element.forEach((element) => {
        element.innerHTML = newValue[key];
      });
    });
    value = newValue;
  };
  return [getter, setter];
}
