import express from "express";
import { Book } from "../model/book.Schema.js";
const router=express.Router();
router.post("/",async (req,res)=>{
    const {title,author,category}=req.body;
    if(!title || title.trim()===""){
        return res.status(400).json({
            message:"Title is required"
        })
    }
    if(!author || author.trim()===""){
        return res.status(400).json({
            message:"Author is required"
        })
    }
    if(!category || category.trim()===""){
        return res.status(400).json({
            message:"Category is required"
        })
    }
    const newBook=await Book.create({
        title,author,category
    })
    return res.status(200).json({
        message:"Book inserted successfully",
        book:newBook
    })
})
router.get("/",async(req,res)=>{
    const page=parseInt(req.query.page)||1;
    const limit=parseInt(req.query.limit)||10;
    const skip=(page-1)*limit;
    const [books,noOfDocuments]=await Promise.all([Book.find().sort({createdAt:-1}).skip(skip).limit(limit),Book.countDocuments()]);
    const pages=Math.ceil(noOfDocuments/limit);
    return res.status(200).json({
        books,
        currPage:page,
        totNoOfRecords:noOfDocuments
    })
})
router.patch("/:id",async(req,res)=>{
    const id=req.params.id;
    if(!id){
        return res.status(400).json({
            message:"Id is required"
        })
    }
    const {status}=req.body
    if(!status){
        return res.status(400).json({
            message:"Status is required"
        })
    }
    await Book.findByIdAndUpdate(id,{
        $set:{
            availabilityStatus:status
        }
    });
    return res.status(200).json({
        message:"Book updated Succcessfully"
    })
})
export {router}