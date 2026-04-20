import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;

const overviewSchema = new Schema(
  {
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: Number,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ["road", "ebike", "gravel", "longtail", "folded"],
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    currency: {
      type: String,
      trim: true,
      default: "EUR",
    },

    colors: {
      type: [String],
      trim: true,
    },
    sizes: {
      type: [String],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    inStock: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { _id: false },
);

const buildSchema = new Schema(
  {
    frame: {
      type: String,
      trim: true,
    },
    fork: {
      type: String,
      trim: true,
    },
    bottomBracket: {
      type: String,
      trim: true,
    },
    headset: {
      type: String,
      trim: true,
    },
    stem: {
      type: String,
      trim: true,
    },
    handlebar: {
      type: String,
      trim: true,
    },
    saddle: {
      type: String,
      trim: true,
    },
    seatPost: {
      type: String,
      trim: true,
    },
    pedals: {
      type: String,
      trim: true,
    },
    grips: {
      type: String,
      trim: true,
    },
  },
  { _id: false },
);

const groupSetSchema = new Schema(
  {
    rearDerailleur: {
      type: String,
      trim: true,
    },
    crank: {
      type: String,
      trim: true,
    },
    shifters: {
      type: String,
      trim: true,
    },
    cassette: {
      type: String,
      trim: true,
    },
    chain: {
      type: String,
      trim: true,
    },
    brakes: {
      type: String,
      trim: true,
    },
    brakeLevers: {
      type: String,
      trim: true,
    },
  },
  { _id: false },
);

const wheelsSchema = new Schema(
  {
    rims: {
      type: String,
      trim: true,
    },
    spokes: {
      type: String,
      trim: true,
    },
    frontHub: {
      type: String,
      trim: true,
    },
    rearHub: {
      type: String,
      trim: true,
    },
    tires: {
      type: String,
      trim: true,
    },
  },
  { _id: false },
);

const subSpecsSchema = new Schema(
  {
    build: {
      type: buildSchema,
      required: true,
    },
    groupSet: {
      type: groupSetSchema,
      required: true,
    },
    wheels: {
      type: wheelsSchema,
      required: true,
    },
  },
  { _id: false },
);

const bikeSchema = new Schema(
  {
    slug: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: [String],
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    overview: {
      type: overviewSchema,
      required: true,
    },

    specs: {
      type: subSpecsSchema,
      required: true,
    },

    images: [
      {
        url: {
          type: String,
        },
        alt: {
          type: String,
        },
        isPrimary: {
          type: Boolean,
        },
      },
    ],
  },
  {
    collection: "Bike",
    timestamps: true,
  },
);

export const Bike = model("Bike", bikeSchema);
