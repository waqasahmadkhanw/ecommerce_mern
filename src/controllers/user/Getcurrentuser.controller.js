import ApiResponse from "../../utils/ApiResponse.js";
import asnycHandler from "../../utils/asyncHandler.js";

const getCurrentUser=asnycHandler(async(req,res)=>{
return res.status(201)
.json(new ApiResponse(200, req.user,"current user get successfully"))
})
export default getCurrentUser