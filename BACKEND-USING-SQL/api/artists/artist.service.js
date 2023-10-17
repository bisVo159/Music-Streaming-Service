const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into Artists( Name, ImagePath) 
                values(?,?)`,
      [
        data.name,
        data.imagePath,
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getArtistByArtistID: (id, callBack) => {
    pool.query(
      `select Name,ImagePath from Artists where ArtistID = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getArtists: callBack => {
    pool.query(
      `select * from Artists`,
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