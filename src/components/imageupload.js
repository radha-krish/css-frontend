import Blogs from "./Blogs";

const url=`https://api.cloudinary.com/v1_1/dvl6br2b4/image/upload`

async function imageupload(image){
    const formdata=new FormData();
    formdata.append("file",image);
    formdata.append("upload_preset","Affiliate")
   const imageres=await fetch(url,{
    method:"post",
    body:formdata
   })
   return imageres.json();
}

export default imageupload;