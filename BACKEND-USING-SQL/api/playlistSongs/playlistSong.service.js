const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into PlaylistSongs(  PlaylistID,SongID) 
                values(?,?)`,
      [
        data.PlaylistID,
        data.SongID
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getPlaylistSongs: (id,callBack) => {
    pool.query(
      `select SongID from PlaylistSongs where PlaylistID=?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  }
};