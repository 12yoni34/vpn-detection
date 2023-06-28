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

app.get('/site', async (req, res) => {
        res.send(`

<title>VPN Detection</title>
<script>
async function init(){
    document.write('<textarea style="width:100%;height:100%">')
    var str=''
    async function checkPing(ip) {
        try{
        a=new Date().valueOf()
        res = await fetch(ip)
        res=await res.text()
        b=new Date().valueOf()
        return   b-a //res.match(/(?<=\/)[a-z0-9\-]+(?= )/)[0] + ',' + (b-a)
        } catch(err) {console.log('error')}
    }
    
    var urls=[
        'http://35.219.229.68',
        'http://35.219.169.37',
        'http://35.219.28.93',
        'http://35.217.73.79',
        'http://35.217.35.213',
        'http://35.216.161.190',
        'http://35.216.98.81',
        'http://35.215.247.74',
        'http://35.215.189.117',
        'http://35.215.125.87',
        'http://35.214.230.88',
        'http://35.214.9.134',
        'http://35.213.201.183',
        'http://35.213.148.92',
        'http://35.213.114.121',
        'http://35.212.207.220',
        'http://35.212.15.179',
        'http://35.211.184.11',
        'http://35.210.69.205',
        'http://35.209.165.66',
        'http://35.207.245.2',
        'http://35.207.104.219',
        'http://35.206.211.169',
        'http://34.163.50.157',
        'http://34.162.78.239',
        'http://34.131.168.243',
        'http://34.129.127.89',
        'http://34.118.118.116',
        'http://34.97.211.233',
        'http://34.18.29.81',
        'http://34.17.43.185',
        'http://34.0.206.207',
        'http://34.0.147.134',
        'http://34.0.64.14',
        'http://34.0.49.13',
        'http://34.0.41.67'

    ]
    for(var url of urls) {
        str+=url
        for(var i=0;i<=10;i++) {
            str+=',' + await checkPing(url)
            document.querySelector('textarea').value=str
        }
        str+='\\n'
    }
}
init().then(console.log).catch(console.log)
</script>        
        `)
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
