import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { Mentor } from "../models/mentorSchema.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";

export const getAllMentors = catchAsyncErrors(async (req, res, next) => {
    const { role } = req.user;
    if (role === "student" || role === "company") {
        const mentors = await User.find({ role: "mentor" });
        res.status(200).json({
            success: true,
            mentors, // Returning mentors data
        });
    }
    else{
        return next(new ErrorHandler("Mentors are not allowed to access this resource.", 400));
    }
  });

  export const fixAppointment =catchAsyncErrors(async(req, res, next)=>{
    const { role } = req.user;
    if (role === "student" || role === "company") {
       const{name, email, phone, role ,mentorid} = req.body;
       if(!name || !email || !phone || !role || !mentorid){
         return next(new ErrorHandler("Please provide full details for appointment.", 400));
       }
       const postedBy = req.user._id;
       const mentor = await User.findById(mentorid);
       console.log("mentorName:", mentor.name);

      // Create the appointment object
      const appointmentData = {
        name,
        email,
        phone,
        role,
        mentorid,
        postedBy,
        mentorName: mentor.name, 
        mentorPhone: mentor.phone, 
    };
    // Create the appointment
    const appointment = await Mentor.create(appointmentData);

    res.status(200).json({
        success: true,
        message: "Appointment scheduled successfully!",
        appointment: {
            ...appointment.toObject(), // Convert appointment to plain JavaScript object
            mentorName: mentor.name,
            mentorPhone: mentor.phone,
        },
    });
    }
    else{
        return next(new ErrorHandler("Mentors are not allowed to access this resource.", 400));
    }
  })
  