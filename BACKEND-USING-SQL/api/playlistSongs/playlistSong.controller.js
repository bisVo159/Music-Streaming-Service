const {
    create,
    getPlaylistSongs
  } = require("./playlistSong.service");
  
  module.exports = {
    createPlaylistSong: (req, res) => {
      const body = req.body;
      create(body, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection errror"
          });
        }
        return res.status(200).json({
          success: 1,
          data: results
        });
      });
    },
    getPlaylistSongs: (req, res) => {
      const id = req.params.id;
      getPlaylistSongs(id, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "Record not Found"
          });
        }
        return res.json({
          success: 1,
          data: results
        });
      });
    }
  };