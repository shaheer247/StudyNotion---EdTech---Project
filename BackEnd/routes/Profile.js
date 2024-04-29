const express = require("express");
const router = express.Router();

const {auth,isStudent,isInstructor} = require("../middlewares/authorization");
const {updateProfile,
    deleteAccount,
    getAllUserDetails,updateDisplayPicture,
    getEnrolledCourses,instructorDashboard} = require("../controllers/Profile");

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************

// Delet User Account
router.delete("/deleteProfile",auth, deleteAccount)
//Update User Profile
router.put("/updateProfile", auth, updateProfile)
router.get("/getUserDetails", auth, getAllUserDetails)
// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)

router.get("/instructorDashboard", auth, isInstructor, instructorDashboard)


module.exports = router