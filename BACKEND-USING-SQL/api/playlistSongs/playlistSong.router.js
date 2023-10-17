const router = require("express").Router();
const {
    createPlaylistSong,
    getPlaylistSongs,
} = require("./playlistSong.controller");

router.post("/", createPlaylistSong);
router.get("/:id", getPlaylistSongs);

module.exports = router;