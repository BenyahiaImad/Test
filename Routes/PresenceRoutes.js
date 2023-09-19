const express = require("express");
const router = express.Router();
const {CheckIn,CheckOut} = require("../Controller/PresenceController");

router.post("/check-in",CheckIn);
router.post("/check-out", CheckOut);

module.exports = router;
