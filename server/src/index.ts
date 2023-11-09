// noinspection BadExpressionStatementJS,CommaExpressionJS

import * as process from 'process';
import express from 'express';

require('dotenv').config();

const app = express();

app.listen(Number(process.env.PORT) ?? 5000, '0.0.0.0', () => {
  console.log('started');
});
