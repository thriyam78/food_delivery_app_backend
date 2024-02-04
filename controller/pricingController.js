const { prisma } = require("../database/db.config.js");

async function AddOrganization(req, res) {
  const { id, name } = req.body;
  try {
    const existingOrganization = await prisma.organization.findUnique({
      where: {
        id: id,
      },
    });
    if (existingOrganization) {
      return res.status(401).json({
        status: "Failed",
        messgae: "Organization already exists",
      });
    }

    const createOrganization = await prisma.organization.create({
      data: {
        id: id,
        name: name,
      },
    });

    return res.status(200).json({
      status: "success",
      message: "Organization Created Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: "Something went wrong",
      error: error,
    });
  }
}

async function TotalPricing(req, res) {
  const { zone, organization_id, total_distance, item_type } = req.body;
  const new_item_type = item_type.toLocaleUpperCase();
  try {
    const existingOrganization = await prisma.organization.findUnique({
      where: {
        id: organization_id,
      },
    });
    if (!existingOrganization) {
      return res.status(401).json({
        status: "failed",
        message: "Please choose Valid Organization",
      });
    }

    const createdItem = await prisma.item.create({
      data: {
        type: new_item_type,
      },
    });
    const kmPrice = new_item_type === createdItem.type ? 1.5 : 1;

    const Pricing = await prisma.pricing.create({
      data: {
        organization_id: organization_id,
        item_id: createdItem.id,
        km_price: kmPrice,
        zone: zone,
      },
    });
    if (Pricing) {
      const total_Price =
        (total_distance - Pricing.base_distance_in_kms) * Pricing.km_price +
        Pricing.fix_price;
      return res.status(200).json({
        status: "Success",
        total_price: total_Price,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "Failed",
      message: "Something went wrong",
      error: error,
    });
  }
}

module.exports = { AddOrganization, TotalPricing };
