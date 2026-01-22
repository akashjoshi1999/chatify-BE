const express = require('express');

const apiRoutes = require('./routes');
const { ServerConfig } = require('./config'); 

const app = express();

app.use('/api', apiRoutes)

app.get('/', (req, res) => {
    res.send('Server is running 🚀');
});

app.listen(ServerConfig.PORT, () => {
    console.log(`Server started on port ${ServerConfig.PORT}`);
});