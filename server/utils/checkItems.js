const Product = require("../models/productModel");

const checkItems = async (productObject) => {
  try {
    let productArray = [];
    let totalAmt = 0;
    const productList = Object.keys(productObject);
    await Promise.all(
      productList.map(async (prodID) => {
        await Product.findById(prodID)
          .select("stock productSP productName")
          .then(async (res) => {
            let { stock, productSP: price, productName: name } = res;
            let qty = Math.min(Number(productObject[prodID]), stock);
            productArray.push({ _id: prodID, price, qty, name });
            totalAmt = totalAmt + qty * price;
          })
          .catch(() => {
            return console.log(`Product with ID ${prodID} not found.`);
          });
      })
    );
    return { productArray, totalAmt };
  } catch (error) {
    console.log(`Error in checkItems function: ${error.message}`);
    throw new Error(error.message);
  }
};

module.exports = checkItems;
