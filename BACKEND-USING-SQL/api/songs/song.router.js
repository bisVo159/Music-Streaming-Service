const router = require("express").Router();
const {
    createSong,
    getSongs,
    getSongBySongId
} = require("./song.controller");

router.post("/", createSong);
router.get("/", getSongs);
router.get("/:id", getSongBySongId);

module.exports = router;