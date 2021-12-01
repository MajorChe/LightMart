// Client facing scripts here

const { response } = require('express');
const getProduct = require('../db/02_productquery.js');



// replace with products rows from database

// const products = [
//   { name: "Macbook Air", price: "180000", ram: 16 },
//   { name: "Samsung Galaxy M21", price: "13999", ram: 4 },
//   { name: "Redmi Note 9", price: "11999", ram: 4 },
//   { name: "OnePlus 8T 5G", price: "45999", ram: 12 }
// ];

// products = return value of getProduct = all rows from products table in database



const sortByDropdown = document.querySelector(".sort-by");
const sortOrderDropdown = document.querySelector(".sort-order");
const container = document.querySelector(".products");

const displayProducts = (products) => {
  let result = "";

  // result = resp. rows
getProduct().then(result => {
  res

})


  // products.forEach(({ name, price }) => {
  //   result += `
  //   <div class="row pb-5 mb-4">
  //   <div class="col-lg-3 col-md-6 mb-4 mb-lg-0">
  //     <div class="card rounded shadow-sm border-0">
  //         <h5> <a href="./product" class="text-dark">${name}</a></h5>
  //         <p class="small text-muted font-italic">${price}</p>
  //       </div>
  //     </div>
  //   </div>
  //   `;
  // });

  container.innerHTML = result;
};

displayProducts(products);







