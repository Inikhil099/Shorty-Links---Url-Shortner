const shortid = require("shortid");
const dbURL = require("../models/urlModel");

async function generateNew(req, res) {
  try {
    const { Url } = req.body;
    if (!Url) {
      return res.status(400).json({ msg: "url is required" });
    }
    const SHORTID = shortid();
    const generatedUrl = await dbURL.create({
      shortId: SHORTID,
      redirectUrl: Url,
      visitHistory: [],
      createdBy: req.user._id,
    });
    return res.status(200).json({ generatedUrl });
  } catch (error) {
    return res.status(500).send("internal server error");
  }
}

async function GoToTheUrl(req, res) {
  const shortId = req.params.shortid;
  const entry = await dbURL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: { timestamps: Date.now() },
      },
    }
  );

  return res.redirect(entry.redirectUrl);
}

async function GetAllUrls(req, res) {
  try {
    const allurls = await dbURL.find({ createdBy: req.user._id });
    if (!allurls) {
      return res.json({ allurls: [] });
    }
    return res.status(200).json({ allurls });
  } catch (error) {
    return res.status(500).send("Internal server error");
  }
}

module.exports = { generateNew, GoToTheUrl, GetAllUrls };
