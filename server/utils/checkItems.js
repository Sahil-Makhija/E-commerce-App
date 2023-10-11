const Product = require("../models/productModel");

const checkItems = async (productObject) => {
  try {
    let productArray = [];
    let totalAmt = 0;
    const productList = Object.keys(productObject);
    await Promise.all(
      productList.map(async (prodID) => {
        await Product.findById(prodID)
          .select("stock productSP")
          .then(async (res) => {
            let { stock, productSP: price } = res;
            let qty = Math.min(Number(productObject[prodID]), stock);
            productArray.push({ [prodID]: { price, qty } });
            totalAmt = totalAmt + qty * price;
            await Product.findByIdAndUpdate(prodID, {
              $inc: { stock: -qty },
            });
          })
          .catch(() => {
            return console.log(`Product with ID ${prodID} not found.`);
          });
      })
    );
    return { productArray, totalAmt };
  } catch (error) {
    console.log(`Error in checkItems function: ${error.message}`);
    throw error;
  }
};

export default checkItems
