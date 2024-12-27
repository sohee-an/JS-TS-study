export function findElement(
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
