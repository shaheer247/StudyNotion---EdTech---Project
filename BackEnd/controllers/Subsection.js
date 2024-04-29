// Import necessary modules
const Section = require("../models/Section");
const SubSection = require("../models/Subsection");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// Create a new sub-section for a given section
exports.createSubSection = async (req, res) => {
    try{
      //Fetch data
      const {sectionId, title, description} = req.body;
  
      //Extract file/video
      const video = req.files.video;
  
      //Validation
      if(!sectionId || !title || !description || !video){
        console.log(sectionId, title, description, video)
        return res.status(400).json({
          error: "Please provide all the required fields"
        });
      }
  
      //Upload video to cloudinary
      const uploadDetails= await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
      
      //Create SubSection
      const subSectionDetails=await SubSection.create({
        title:title,
        timeDuration:`${uploadDetails.duration}`,
        description:description,
        videoUrl:uploadDetails.secure_url
      })
      
      //Pushing subsection id into the section
      const updatedSection = await Section.findByIdAndUpdate(
        { _id: sectionId },
        { $push: { subSection:subSectionDetails._id } },
        { new: true }
      ).populate("subSection");
  
      //Returning Response
      return res.status(201).json({
        success:true,
        message:"SubSection created successfully",
        data: updatedSection
      });
    } catch(err){
      return res.status(500).json({
        success:false,
        message:"Error while creating subsection"
      });
    }
}

//Update SubSection
exports.updateSubSection = async (req, res) => {
    try {
  
      //Fetch data
      const { sectionId, subSectionId, title, description } = req.body
      const subSection = await SubSection.findById(subSectionId)
  
      //Validations
      if (!subSection) {
        return res.status(404).json({
          success: false,
          message: "SubSection not found",
        })
      }
      if (title !== undefined) {
        subSection.title = title
      }
      if (description !== undefined) {
        subSection.description = description
      }
      if (req.files && req.files.video !== undefined) {
        const video = req.files.video
        const uploadDetails = await uploadImageToCloudinary(
          video,
          process.env.FOLDER_NAME
        )
        subSection.videoUrl = uploadDetails.secure_url
        subSection.timeDuration = `${uploadDetails.duration}`
      }
      //Saving the subsection
      await subSection.save();
      const updatedSection = await Section.findById(sectionId).populate("subSection")
  
      //Returning response
      return res.json({
        success: true,
        message: "Section updated successfully",
        data: updatedSection
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the sub section",
      })
    }
}

//Delete SubSection
exports.deleteSubSection = async (req, res) => {
    try {
      const { subSectionId, sectionId } = req.body
      await Section.findByIdAndUpdate(
        { _id: sectionId },
        {
          $pull: {
            subSection: subSectionId,
          },
        }  //Doubt new true or not
      )
      const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })
  
      if (!subSection) {
        return res
          .status(404)
          .json({ success: false, message: "SubSection not found" })
      }
  
      const updatedSection = await Section.findById(sectionId).populate(
        "subSection"
      )
  
      return res.json({
        success: true,
        message: "SubSection deleted successfully",
        data: updatedSection,
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while deleting the SubSection",
      })
    }
}