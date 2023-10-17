const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into Playlists( Title,UserID,url,totalSongs) 
                values(?,?,?,?)`,
      [
        data.Title,
        data.UserID,
        data.url,
        data.totalSongs,
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getPlaylists: callBack => {
    pool.query(
      `select * from Playlists`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  }
};