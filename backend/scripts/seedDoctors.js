import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import doctorModel from "../models/doctorModel.js";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("MONGODB_URI is not set in environment. Aborting.");
  process.exit(1);
}

const connect = async () => {
  // if MONGODB_URI already has query params like '/?appName=Cluster0'
  // make sure we insert the database name *before* the query string.
  const base = MONGODB_URI;
  const uri = base.includes("?")
    ? base.replace(/\/?\?/, "/prescripto?")
    : `${base}/prescripto`;

  await mongoose.connect(uri);
};

const sampleDoctors = async () => {
  const defaultPassword = await bcrypt.hash("password123", 10);

  const now = Date.now();

  return [
    {
      name: "Dr. Richard James",
      email: "doc1@example.com",
      password: defaultPassword,
      image: "https://via.placeholder.com/300?text=Dr+Richard+James",
      speciality: "General physician",
      degree: "MBBS",
      experience: "4 Years",
      about: "Experienced general physician focused on preventive care.",
      fees: 50,
      address: { line1: "17th Cross, Richmond", line2: "Circle, Ring Road" },
      available: true,
      date: now,
      slots_booked: {},
    },
    {
      name: "Dr. Emily Larson",
      email: "doc2@example.com",
      password: defaultPassword,
      image: "https://via.placeholder.com/300?text=Dr+Emily+Larson",
      speciality: "Gynecologist",
      degree: "MBBS",
      experience: "3 Years",
      about: "Caring gynecologist with experience in women's health.",
      fees: 60,
      address: { line1: "27th Cross, Richmond", line2: "Circle, Ring Road" },
      available: true,
      date: now,
      slots_booked: {},
    },
    {
      name: "Dr. Sarah Patel",
      email: "doc3@example.com",
      password: defaultPassword,
      image: "https://via.placeholder.com/300?text=Dr+Sarah+Patel",
      speciality: "Dermatologist",
      degree: "MBBS",
      experience: "1 Years",
      about: "Skin specialist focused on modern dermatology treatments.",
      fees: 30,
      address: { line1: "37th Cross, Richmond", line2: "Circle, Ring Road" },
      available: true,
      date: now,
      slots_booked: {},
    },
  ];
};

const run = async () => {
  try {
    await connect();

    const action = process.argv[2];

    if (action === "clear") {
      const del = await doctorModel.deleteMany({});
      console.log("Deleted doctors:", del.deletedCount);
      process.exit(0);
    }

    const docs = await sampleDoctors();

    // attempt to insert; skip duplicates (use unordered insert)
    const result = await doctorModel.insertMany(docs, { ordered: false });
    console.log("Inserted doctors: ", result.map((d) => d.email));

    process.exit(0);
  } catch (err) {
    // if duplicate error occurs, we still exit gracefully
    console.error(err.message);
    process.exit(1);
  }
};

run();
