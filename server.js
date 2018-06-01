const express = require('express');
const cors = require('cors');

const server = express();

const port = 5000;






server.listen(port, () => console.log(`server running on port ${port}`));