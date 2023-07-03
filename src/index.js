const dotenv = require('dotenv');
const app = require('./app');
const db = require('./models');

dotenv.config();

const PORT = process.env.PORT || 3000;

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to the database has been established succesfuly.');
    app.listen(PORT, (err) => {
      if (err) {
        return console.error('Fallo: ', err);
      }
      console.log('listening on port 3000');
      return app;
    });
  })
  .catch((err) => console.error('unable to connect to the database', err));