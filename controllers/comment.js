const Comment = require("../model/comment");
const News = require("../model/news");

const create = async(req,res)=>{
  const {comments,news_id} = req.body;
  //userID

  const checkNews = await News.findOne({_id:news_id});

  if(checkNews){
    const comment_data = new Comment({
      comment_text:comments,
      news:news_id,
      
    });
    try {
      //save comment to table comments
      const newComment = await comment_data.save();
      //check if cannot save
      if(newComment){
        res.status(201).json({msg:'success'});
      }else{
        res.status(400).json({msg:'error'});
      }
   
    } catch (err) {
      res.status(500).json({msg:'error', message: err.message });
    }
  }else{
    res.status(500).json({msg:'error',comment:'cannot find new id'});
  }
}
const update = async(req,res)=>{
  var id = req.params.id;
  const {comments} = req.body;

  try {
    const edit_comment = await Comment.findById(id);
    if(edit_comment){
      edit_comment.comment_text=comments;
      await edit_comment.save();
      res.status(200).json({ msg:'success', command: "Edit success" });
    }else{
      res.status(400).json({ msg:'error', command: "Cannot Edit" });
    }

  } catch (error) {
    res.json({ msg:'error',command:"Errors"});
  }
  
}
const deleteCom = async (req,res)=>{
  var id = req.params.id;
  try {
    const where = {_id:id};
    const setValue = {status:false};
    const user = await Comment.updateOne(where,setValue);
    if(user){
        res.status(200).json({msg:'success',command:'Already Delete Comments.'});
    }else{
       res.status(200).json({msg:'error',command:'Error'});
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const list = async (req,res)=>{
  try {
    const getting = await Comment.find();
    res.json({ msg: 'success', datas: getting });
  } catch (error) {
    res.json({ msg: 'error', error: error });
  }
}
const listbyid = async (req,res)=>{
  var id = req.params.id;
  try {
    const getting = await Comment.findById(id);
    res.json({ msg: 'success', datas: getting });
  } catch (error) {
    res.json({ msg: 'error', error: error });
  }
}


module.exports={
  create,
  list,
  update,
  deleteCom,
  listbyid

}