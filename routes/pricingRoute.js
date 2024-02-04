const express = require("express");

const router = express.Router();
const {
  TotalPricing,
  AddOrganization,
} = require("../controller/pricingController");

router.post("/createOrganization", AddOrganization);
router.post("/totalPrice", TotalPricing);

module.exports = router;
