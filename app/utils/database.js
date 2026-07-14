import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://sinhadeepak619_db_user:OC1tLbKMHveIUXc9@cluster0.ir7zhuy.mongodb.net/",
      {
        dbName: "NextJS_Auth_App",
      },
    );
    console.log("Database Connected Successfully...!!!");
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;
