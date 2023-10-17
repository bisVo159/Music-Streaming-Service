const router = require("express").Router();
const {
    createPlaylist,
    getPlaylists
} = require("./playlist.controller");

router.post("/", createPlaylist);
router.get("/", getPlaylists);

module.exports = router;