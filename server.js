const express = require('express');

const port = process.env.PORT || 4040;
const app = express();

app.use(express.static('public'));

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 👍 http://localhost:%s/', port);
  }
});
