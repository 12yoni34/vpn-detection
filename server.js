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
        'http://35.215.41.95',
        'http://35.215.41.95',
        'http://35.211.184.11',
        'http://35.207.104.219'
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
