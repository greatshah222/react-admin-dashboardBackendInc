import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";
import getCountryIso3 from "country-iso-2-to-3";

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
export const getTransactions = async (req, res) => {
  try {
    // pagination
    // sort should look like this {
    //   "field":" userId", sort :"desc"
    // }
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    // formatted sort should look like this {userId : -1}

    const generateSort = () => {
      const sortParsed = JSON.parse(sort);

      const sortFormatted = {
        [sortParsed.field]: sortParsed.sort === "asc" ? 1 : -1,
      };

      return sortFormatted;
    };

    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const transactions = await Transaction.find({
      // search the cost field  with user input
      // or allows to search multiple fields
      $or: [
        {
          cost: {
            $regex: new RegExp(search, "i"),
          },
        },
        {
          userId: {
            $regex: new RegExp(search, "i"),
          },
        },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    // total amount of transaction

    // const total = await Transaction.countDocuments({
    //   // counting with search option
    //   name: {
    //     $regex: search,
    //     $options: "i",
    //   },
    // });
    // const total = await Transaction.countDocuments({
    //   name: { $regex: search, $options: "i" },
    // });
    const total = await Transaction.countDocuments();

    res.status(200).json({
      transactions,
      total,
    });
  } catch (error) {
    console.log(error);

    res.status(404).json({
      message: error.message,
    });
  }
};

export const getGeography = async (req, res) => {
  try {
    const users = await User.find();
    // saving data based on nivo chart ->
    const mappedLocations = users.reduce((acc, { country }) => {
      // in mock data we have country with 2 letters nivo chart expects 3 so we are using some npm packages
      const countryISO3 = getCountryIso3(country);
      // we will add to object if it doesnot exists
      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }
      // example Nep will keep on increasing if it is found inusers
      acc[countryISO3]++;
      return acc;
    }, {});

    const formattedLocations = Object.entries(mappedLocations).map(
      // since el is ['nep',45] we change this to country and value
      ([country, count]) => {
        // format supported by nivo
        return { id: country, value: count };
      }
    );

    res.status(200).json(formattedLocations);
  } catch (error) {
    console.log(error);

    res.status(404).json({
      message: error.message,
    });
  }
};
