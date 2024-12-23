import learnwith from "./api"
import "./style.css"



let products: any[] = []; 
  learnwith()
    .then((res: any[]) => {
        products = res; 
      const productElement = document.querySelector<HTMLDivElement>("#products");
      if (productElement) {
        productElement.innerHTML = res.map((product,index) => `
          <div class="product" data-product-id="${product.id}" data-product-index=${index}> 
          <img  src="${product.images[0]}" alt="Image of ${product.name}"/>
            <p>${product.name}</p>
            <div class="flex items-center justify-between">
                <span>Price : ${product.regularPrice}</span>
                <div>
                    <button type="button" disabled class="btn-decrease bg-green-200 disabled:cursor-not-allowed bg-gray-200 rounded-lg hover:bg-green-300 text-green-800 py-1 px-3">-</button>
                    <span class="cart-count text-green-800"></span>
                    <button type="button" class="btn-increase bg-green-200  rounded-lg hover:bg-green-300 text-green-800 py-1 px-3">+</button>
                </div>
                
            </div>
            </div>
        `).join("");
      }
    })
    .catch((error) => {
      console.error("데이터 로딩 실패:", error);
    });

    function findElement(startingElement:any,selector:string){
        let currentElement = startingElement;
        //밑에서부터 찾아서 올라간다.
        while(currentElement){
            if(currentElement.matches(selector)){
                return currentElement
            }
            currentElement=currentElement.parentElement;
          
        }
        return null;

    }

//     function findElement(startingElement: any, selector: string) {
//     let currentElement = startingElement;
//     // 밑에서부터 찾아서 올라간다.
//     while (currentElement) {
//         if (currentElement instanceof Element && currentElement.matches(selector)) {
//             return currentElement;
//         }
//         currentElement = currentElement.parentElement;
//     }
//     return null;
// }

    const sum=(count:object)=>{
        return Object.values(countMap as number[]).reduce((sum, curr) => sum + curr, 0);
    }


    const countMap={}as any
  
    
    document.querySelector("#products")?.addEventListener("click", (event) => {
        const targetElement = event?.target;
        if (!targetElement) return;
    
        const productElement = findElement(targetElement, ".product");
        if (!productElement) return;
    
        const productId = productElement.getAttribute("data-product-id");
        const product = products.find(product => product.id === productId);
        if (!product) return;
    
        if (targetElement instanceof Element) {
            if (targetElement.matches(".btn-decrease") || targetElement.matches(".btn-increase")) {
                // 카운트 초기화
                if (countMap[productId] === undefined) {
                    countMap[productId] = 0;
                }
    
                // 카운트 업데이트
                if (targetElement.matches(".btn-decrease")) {
                    if (countMap[productId] > 0) {  // 음수 방지
                        countMap[productId] -= 1;
                    }
                } else {
                    countMap[productId] += 1;
                }
    
                // 현재 상품의 카운트 표시 업데이트
                const cartCount = productElement.querySelector(".cart-count");
                if (cartCount) {
                    cartCount.innerHTML = countMap[productId] || "";
                }
    
                // 장바구니 업데이트
                const cartItems = document.querySelector(".cart-items");
                console.log("ccc",cartItems)
                if (cartItems) {
                    const cartHTML = Object.entries(countMap)
                        .filter(([_, count]:[any,any]) => count > 0)
                        .map(([id, count]) => {
                            const prod = products.find(p => p.id === id);
                           
                            if (!prod) return '';
                            return `
                                <div class="product" data-product-id="${prod.id}">
                                    <img src="${prod.images[0]}" alt="Image of ${prod.name}"/>
                                    <p>${prod.name}</p>
                                    <div class="flex items-center justify-between">
                                        <span>Price: ${prod.regularPrice}</span>
                                        <div>
                                            <button type="button" class="btn-decrease bg-green-200 rounded-lg hover:bg-green-300 text-green-800 py-1 px-3">-</button>
                                            <span class="cart-count text-green-800">${count}</span>
                                            <button type="button" class="btn-increase bg-green-200 rounded-lg hover:bg-green-300 text-green-800 py-1 px-3">+</button>
                                        </div>
                                    </div>
                                </div>
                            `;
                        })
                        .join('');
                    cartItems.innerHTML = cartHTML
                }
    
                // 총 개수 업데이트
                const totalCount = document.querySelector(".total_count");
                console.log("tt",totalCount)
                if (totalCount) {
                    const sumCount = sum(countMap);
                    totalCount.innerHTML = `(${sumCount})`;
                }
            }
        }
    });



    document.querySelector(".btn-cart")?.addEventListener("click",(event)=>{
        document.body.classList.add("displaying_cart")
        // const cartLayer = document.querySelector<HTMLElement>(".cart-layer");
        // if (cartLayer) {
        //   cartLayer.style.display = "block";
        // }

    })
   

    document.querySelector(".btn-close-cart")?.addEventListener("click",()=>{
        document.body.classList.remove("displaying_cart")
    })
    
    document.querySelector(".cart-dimmed-bg")?.addEventListener("click",()=>{
        document.body.classList.remove("displaying_cart")
    })