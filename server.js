// v2
const express = require('express');
const cors = require('cors');

const app = express();
const port = 80;
console.log(new Date(),"Server started listen to port:",80)
// Enable CORS
app.use(cors());

// Route for handling requests
app.get('/', async (req, res) => {
        res.send('Hello from ' + await getInstanceRegion() + ' now it ' + new Date() + '. This is Yoni Glickshtein VPN detection  project')
});

// Start the server
app.listen(port, async () => {
});


const http = require('http');

function getInstanceRegion() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'metadata.google.internal',
      path: '/computeMetadata/v1/instance/zone',
      headers: {
        'Metadata-Flavor': 'Google',
      },
    };

    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        resolve(data.trim());
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}
