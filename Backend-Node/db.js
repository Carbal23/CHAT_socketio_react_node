const db = require("mongoose");

db.Promise = global.Promise;

const connect = async (url) => {
  db.connect(url,
    {
      //   useNewUrlParse: true,
      useUnifiedTopology: true,
      //   useFindAndModify: false,
    }
  );
  console.log("DB conectada con exito");
};

module.exports = connect;