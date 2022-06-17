const News = require("../model/news");
const fs = require("fs");
const path = require("path");

const create = async(req,res)=>{
 const {title,resource,description,typefaq_id,adminId} = req.body;

  if(req.file){
    var baseUrl = "http://localhost:3001/uploads/"+req.file.filename;
  }else{
    var baseUrl = "";
  }
  // console.log(req.file.originalname);
  // console.log(title);
  const news_data = new News({
    title:title,
    resource:resource,
    description:description,
    type:typefaq_id,
    create_by:'6285a52b357e727b1e95d074',
    client_view:true,
    image:baseUrl,
  });

  const news_create = await news_data.save();
  if(news_create){
    res.status(201).json({msg:'success'});
  }else{
    res.status(400).json({msg:'error', message: err.message });
  }
}
const clientCreate = async(req,res)=>{
  const {title,description} = req.body;
  
  const news_data = new News({
    title:title,
    description:description,
    client_view:false,
  });

  const news_create = await news_data.save();
  if(news_create){
    res.status(201).json({msg:'success'});
  }else{
    res.status(400).json({msg:'error', message: err.message });
  }
}

const update = async(req,res)=>{
  var id = req.params.id;

  const {title,typefaq_id,resource,description} = req.body;

  //console.log(req.file.filename);


  
  try {
    const edit_news = await News.findById(id);
  
    edit_news.title = title;
    edit_news.type = typefaq_id;
    edit_news.resource = resource;
    edit_news.description = description;

  
    if(req.file){
      var baseUrl = "http://localhost:3001/uploads/"+req.file.filename;
      edit_news.image = baseUrl;
    }

    await edit_news.save();
    res.status(200).json({ msg:'success', command: "Edit success" });

  } catch (error) {
    console.log(error);
    res.json({ msg:'error',command:"Errors"});
  }

}

const list = async(req,res)=>{
    try {
      const getting = await News.find({status:true}).populate([
        {
            path: 'create_by',
            model: 'User'
        }, 
        {
            path: 'type',
            model: 'Typefaq'
        }
      ]);
      if(getting){
        res.json({ msg: 'success', datas: getting });
      }else{
        res.json({ msg: 'error', error: error });
      }
      
    } catch (error) {
      res.json({ msg: 'error', error: error });
    }
}

const listClient = async(req,res)=>{
    try {
      const getting = await News.find({client_view:true,status:true});
      if(getting){
        res.json({ msg: 'success', datas: getting });
      }else{
        res.json({ msg: 'error', error: error });
      }
      
    } catch (error) {
      res.json({ msg: 'error', error: error });
    }
}

const deleteNews = async (req,res)=>{
  var id = req.params.id;
  try {
    const where = {_id:id};
    const setValue = {status:false};
    const user = await News.updateOne(where,setValue);
    if(user){
        res.status(200).json({msg:'success',command:'Already Delete News.'});
    }else{
       res.status(200).json({msg:'error',command:'Error'});
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const RecoverNews = async (req,res)=>{
  var id = req.params.id;
  try {
    const where = {_id:id};
    const setValue = {status:true};
    const user = await News.updateOne(where,setValue);
    if(user){
        res.status(200).json({msg:'success',command:'Already recovered News.'});
    }else{
       res.status(200).json({msg:'error',command:'Error'});
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports={
  create,
  list,
  update,
  deleteNews,
  RecoverNews,
  listClient
}