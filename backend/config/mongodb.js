import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => console.log("Database Connected"));

  // ensure the database name is inserted before any query params
  const base = process.env.MONGODB_URI;
  const uri = base.includes("?")
    ? base.replace(/\/?\?/, "/prescripto?")
    : `${base}/prescripto`;

  await mongoose.connect(uri);
};

export default connectDB;
