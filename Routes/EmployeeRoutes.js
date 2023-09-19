const express = require("express");
const router = express.Router();
const {addEmployee,getAllEmployee} = require("../Controller/EmployeeController");

router.post("/addEmployee",addEmployee);
router.get("/getAllEmployee/", getAllEmployee);

module.exports = router;
