import mongoose from "mongoose";
const  postSchema = mongoose.Schema({
    title:{
         type:String,
         required:true
    },
    summary:{
        type: String,
        required: true,

    },
   content:{
    type : String ,
    require:true
   } ,
   auther:{
    type: mongoose.Types.ObjectId,ref :'User'
   },
  postId:{
    type:[String]

  },

    
},{ timeStamps:true});
  
const Post= mongoose.model("Post",postSchema);
export default Post;