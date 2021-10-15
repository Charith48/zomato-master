import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const UserSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: {type: String, required: true},
    password: {type: String},
    address: [{ detail: {type: String}, for:{type: String} }],
    phoneNumber: [{type: Number}]
},
{
    timestamps: true
});

UserSchema.statics.findEmailAndPhone = async ({ email, phoneNumber }) => {
    // Check whether email or phone number already exists.
    const checkUserByEmail = await UserModel.findOne({ email });
    const checkUserByPhone = await UserModel.findOne({ phoneNumber });

    if (checkUserByEmail || checkUserByPhone) {
        throw new Error("User already exitst");
    }

    return false;
}

UserSchema.statics.findEmailAndPassword = async ({ email, password }) => {
    // Check whether email  exists.
    const user = await UserModel.findOne({ email });
    if(!user) throw new Error("User doesnot exist");
    // comapare password
    const doesPasswrodMatch = await bcrypt.compare(password, user.password);

    if (!doesPasswrodMatch) {
        throw new Error("Invalid password");
    }

    return user;
}

UserSchema.pre("save", function(next) {
    const user = this;

    // Password is not modified
    if (!user.isModified("password")) return next();

    // generating bcrypt salt
    bcrypt.genSalt(8, (error, salt) => {
        if (error) return next(error);

        bcrypt.hash(user.password, salt, (error, hash) => {
            if (error) return next(error);

            // assigning hashed password
            user.password = hash;
            return next();
        });
    });
});

UserSchema.methods.generateJwtToken = function() {
    return jwt.sign({ user: this._id.toString() }, "Shimato");
}

export const UserModel = mongoose.model("Users", UserSchema);