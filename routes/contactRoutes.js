const express = require("express");
const router = express.Router();
const {getContact,
getContactById,
postContact,
putContact,
deleteContact,}= require("../controllers/contactController");

router.route("/").get(getContact).post(postContact);
router.route("/:id").get(getContactById);
router.route("/:id").put(putContact);
router.route("/:id").delete(deleteContact);


module.exports = router;