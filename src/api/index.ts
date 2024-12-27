import jsondata from "./data.json?raw";
export async function getProducts() {
  if (process.env.NODE_ENV === "development") {
    return JSON.parse(jsondata);
  } else {
    const response = await fetch(
      "https://learnwitheunjae.dev/api/sinabro-js/ecommerce"
    );

    return await response.json();
  }
}
