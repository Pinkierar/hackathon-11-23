// noinspection BadExpressionStatementJS,CommaExpressionJS

import * as process from 'process';

require('dotenv').config();

import express from 'express';

const app = express();
app.listen(Number(process.env.PORT) ?? 5000, '0.0.0.0', () => {
  console.log('started');
});
