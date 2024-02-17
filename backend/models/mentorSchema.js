import mongoose from "mongoose";
import validator from "validator";

const mentorSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,"Please Provide Your Name!"],
        minLength:[3,"Name must contain at least 3 Characters!"],
        maxLength:[30, "Name cannot exceed 30 Characters!"],
        },
    email: {
        type: String,
        required: [true, "Please enter your Email!"],
        validate: [validator.isEmail, "Please provide a valid Email!"],
        },
    phone: {
            type: Number,
            validate: {
                validator: function(v) {
                    return String(v).length === 10; // Check if length is exactly 10 digits
                },
                message: props => `${props.value} is not a valid phone number! Please enter a 10-digit number.`,
            },
            required: [true, "Please enter your Phone Number!"],
        },
    role: {
            type: String,
            required: [true, "Please select a role"],
            enum: ["student","company","mentor"],
        },
    mentorid:{
        type: mongoose.Schema.Types.ObjectId, // Using ObjectId as the type for _id field
        required:[true,"please Provide Id"]
    }

})
export const Mentor = mongoose.model("Mentor", mentorSchema);