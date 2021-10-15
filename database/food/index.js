import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema({
    name: {type: String, required: true},
    describe: {type: String, required: true},
    isVeg: {type: Boolean, required: true},
    isEgg: {type: Boolean, required: true},
    category: {type: String, required: true},
    photos: {type: mongoose.Types.ObjectId, ref: "Image"},
    price: {type: Number, default: 150, required: true},
    addOns: [{type: mongoose.Type.ObjectId, ref: "Food"}],
    restaurant: {
        type: mongoose.Type.ObjectId, 
        ref: "Restaurants", required: true
    }
},
{
    timestamps: true
});

export const FoodModel = mongoose.model("Foodz", FoodSchema)