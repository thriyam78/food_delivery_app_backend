const {
  AddOrganization,
  TotalPricing,
} = require("../controller/pricingController");

describe("AddOrganization", () => {
  test("should return failed for missing or invalid input parameters", async () => {
    const req = {
      body: {},
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await AddOrganization(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: "failed",
        message: "Something went wrong",
        error: expect.anything(),
      })
    );
  });

  test("should return failed for duplicate organization ID", async () => {
    const req = {
      body: {
        id: "duplicateId",
        name: "someName",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await AddOrganization(req, res);
    await AddOrganization(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: "Failed",
        message: "Organization already exists",
      })
    );
  });
});

describe("TotalPricing", () => {
  test("should return failed for invalid organization ID", async () => {
    const req = {
      body: {
        zone: "someZone",
        organization_id: "invalidOrgId",
        total_distance: 100,
        item_type: "someType",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await TotalPricing(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: "failed",
        message: "Please choose Valid Organization",
      })
    );
  });
});
