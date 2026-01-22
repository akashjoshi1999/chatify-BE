const express = require('express');

const apiRoutes = require('./routes');
const { ServerConfig } = require('./config'); 

const app = express();
const PORT = ServerConfig.PORT || 3000;

app.use('/api', apiRoutes)

app.get('/', (req, res) => {
    res.send('Server is running 🚀');
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server started on port ${PORT}`);
});