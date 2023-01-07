import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    const productsWithStats = await Promise.all(
      products.map(async (el) => {
        const stat = await ProductStat.find({
          productId: el._id,
        });

        return {
          ...el._doc,
          stat,
        };
      })
    );
    res.status(200).json(productsWithStats);
  } catch (error) {
    console.log(error);

    res.status(404).json({
      message: error.message,
    });
  }
};

export const getCustomers = async (req, res) => {
  try {
    // we dont send password to frontend
    const customers = await User.find({ role: "user" }).select("-password");

    res.status(200).json(customers);
  } catch (error) {
    console.log(error);

    res.status(404).json({
      message: error.message,
    });
  }
};
