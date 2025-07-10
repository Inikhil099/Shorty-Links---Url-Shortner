const shortid = require("shortid");
const dbURL = require("../models/urlModel");

async function generateNew(req, res) {
  try {
    console.log("req on generate")
  const {Url} = req.body;
  if (!Url) {
    return res.status(400).json({ msg: "url is required" });
  }
  const SHORTID = shortid();
  const generatedUrl = await dbURL.create({
    shortId: SHORTID,
    redirectUrl: Url,
    visitHistory: [],
    createdBy : req.user._id,
  });
  return res.status(200).json({generatedUrl})
  } catch (error) {
    return res.status(500).send("internal server error")
  }
}



async function GoToTheUrl(req,res){
  const shortId = req.params.shortId;
  const entry = await dbURL.findOneAndUpdate(
    {
      shortID : shortId,
    },
    {
      $push: {
        visitHistory: { timestamps: Date.now() },
      },
    }
  );

  return res.redirect(entry.redirectUrl);

}



module.exports = {generateNew,GoToTheUrl}