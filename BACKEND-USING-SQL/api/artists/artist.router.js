const router = require("express").Router();
const {
createArtist,
  getArtistByArtistID,
  getArtists
} = require("./artist.controller");

router.get("/",   getArtists);
router.post("/", createArtist);
router.get("/:id", getArtistByArtistID);

module.exports = router;