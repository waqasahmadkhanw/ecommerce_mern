//Make an arrow function 
//Which is a higher order function (a function  that accepts another fun in it.)
//whict return promises and .catch
const asnycHandler=(requestHandler)=>{
return (req,res,next)=>{
 Promise.resolve(requestHandler(req,res,next)).catch((error) =>next(error))
}
}
export default asnycHandler