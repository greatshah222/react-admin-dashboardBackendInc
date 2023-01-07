import mongoose from "mongoose";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

export const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({
      role: "admin",
    }).select("-password");

    res.status(200).json(admins);
  } catch (error) {
    console.log(error);

    res.status(404).json({
      message: error.message,
    });
  }
};
export const getuserPerformance = async (req, res) => {
  try {
    const { id } = req.params;

    // this is like sequel joins

    const userWithStats = await User.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
      /// now check in afffilate stats model and matching as with userId
      {
        $lookup: {
          from: "affilatestats",
          localField: "_id",
          foreignField: "userId",
          // in the property called affilateStats
          as: "affilateStats",
        },
      },

      // to flatten the array->the above propery affilateStats
      { $unwind: "$affilateStats" },
    ]);

    const salesTransactions = await Promise.all(
      userWithStats[0].affilateStats.affiliateSales.map(async (id) => {
        return await Transaction.findById(id);
      })
    );

    const filteredSalesTransactions = salesTransactions.filter(
      (el) => el !== null
    );

    res.status(200).json({
      user: userWithStats[0],
      sales: filteredSalesTransactions,
    });
  } catch (error) {
    console.log(error);

    res.status(404).json({
      message: error.message,
    });
  }
};
