const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into Songs(  Title,ArtistID,Album,ReleaseYear,DurationInSeconds,new_artist,thumbnail,url) 
                values(?,?,?,?,?,?,?,?)`,
      [
        data.Title,
        data.ArtistID,
        data.Album,
        data.ReleaseYear,
        data.DurationInSeconds,
        data.url,
        data.new_artist,
        data.thumbnail
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getSongs: callBack => {
    pool.query(
      `select * from Songs`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getSongBySongId: (id, callBack) => {
    pool.query(
      `select * from Songs where SongId=?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
};