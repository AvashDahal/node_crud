const asyncHandler = require("express-async-handler");
const Contact =require('../models/contactModel');
const { Error } = require("mongoose");
//description for get all contacts
// a route GET api/contacts
// access public

const getContact =asyncHandler(async (req,res)=>{
    const contacts= await Contact.find();
    res.status(200).json(contacts);

});
const getContactById =asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(404);
        throw new Error("Contact not found bro");

    }
    res.status(200).json(contact)
});
const postContact=asyncHandler(async(req,res)=>{
    console.log("The body is",req.body);
    const{name,email,phone}= req.body;
    if(!name|| !email || !phone)
    {
        res.status(400);
        throw new Error(("All fields are mandatory"));
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        
    });
    res.status(201).json(contact);
    
});
const putContact=asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(404);
        throw new Error("Contact not found");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).json(updatedContact);
});
const deleteContact =asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(404);
        throw new Error("Contact Not found");
    }
    await Contact.deleteOne({_id: req.params.id});
    res.status(200).json(contact)
    
});

module.exports = {getContact,
                 getContactById,
                    postContact,
                putContact,
            deleteContact};