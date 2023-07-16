export function getAllProducts() {
  return fetch("https://dummyjson.com/products").then((res) => res.json());
}
export function getProductsByCategory(category) {
  return fetch(`https://dummyjson.com/products/category/${category}`).then(
    (res) => res.json()
  );
}
export function getCart() {
  return fetch("https://dummyjson.com/carts/1").then((res) => res.json());
}
export function addToCart(id) {
  return fetch("https://dummyjson.com/carts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: 1,
      products: [
        {
          id: id,
          quantity: 1,
        },
      ],
    }),
  })
    .then((res) => res.json())
    .then(console.log);
}
