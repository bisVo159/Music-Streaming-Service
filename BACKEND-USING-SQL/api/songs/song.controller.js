const {
    create,
    getSongs,
    getSongBySongId
  } = require("./song.service");
  
  module.exports = {
    createSong: (req, res) => {
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
    getSongs: (req, res) => {
        getSongs((err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.json({
          success: 1,
          data: results
        });
      });
    },
    getSongBySongId:(req, res) => {
      const id = req.params.id;
      getSongBySongId(id,(err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "Record not Found",
            id:idsArray
          });
        }
        return res.json({
          success: 1,
          data: results
        });
      });
    }
  };