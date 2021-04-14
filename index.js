const express = require('express');
const bodyParser = require('body-parser');
const { config } = require('dotenv');
const cors = require('cors');
const routes = require('./api/routes');
const handleError = require('./api/middlewares/handleError');
const Rescue = require('express-rescue');
const jobClearExpiratedPasswordResets = require('./api/utils/clearExpiratedResets');
const jobClearExpiratedPendingUsers = require('./api/utils/clearExpiratedPendingUsers');

config();
const app = express();
jobClearExpiratedPasswordResets.start();
jobClearExpiratedPendingUsers.start();

const corsOptions = {
  origin: process.env.FRONT_URL,
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(Rescue(routes));
app.use(handleError);

app.listen(process.env.PORT, () => console.log(`Running on port ${process.env.PORT}!`));
