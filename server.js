const express = require("express");
const app = express();

app.use(express.json())
//Create a new repo in GitHub
//Clone the repo locally

//Bind to a port dinamically assigned by Heroku 
let port = process.env.PORT || 7777;

const { Pool } = require("pg")

//Specify Pool's connectionString property and bind it to  env var DATABASE_URL 
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

//connectionString should be encoded as follows:
//postgres://<USERNAME>:<PASSWORD>@<HOST>:<PORT>/<DB>

// To set env. variable in Linux / macOS  run these comands in terminal
// export PORT=numb_of_port
// export DATABASE_URL=postgres://<USERNAME>:<PASSWORD>@<HOST>:<PORT>/<DB>
// npm run start or npm run dev

//In my case 
//export PORT = 7777 npm run start
//export DATABASE_URL=postgres://codeyourfuture:donashehu@localhost:5432/cyf_hotels?sslmode=disable
//npm run dev

///Heroku BD Credentials
//postgres://teiiyhdhwetorm:5066250e6a4314a99f04471cd63608607b167006347d51f7e60c13fab95c9267@ec2-176-34-215-248.eu-west-1.compute.amazonaws.com:5432/dc089k9v9gcam

// psql -h <HOST> -p <PORT> -U <USERNAME> -W <DB>


// provide password when prompted
// Locl DB credentials 
//  const pool = new Pool({
//     user: 'codeyourfuture',
//     host: 'localhost',
//     database: 'cyf_hotels',
//     password: 'donashehu',
//     port: 5432
// });

app.get("/hotels", function (req, res) {
    pool.query('SELECT * FROM hotels')
        .then((result) => res.json(result.rows))
        .catch((error) => {
            console.error(error);
            res.status(500).json(error);
        });
});
app.get("/customers", function (req, res) {
    pool.query('SELECT * FROM customers')
        .then((result) => res.json(result.rows))
        .catch((error) => {
            console.error(error);
            res.status(500).json(error);
        });
});
app.get("/bookings", function (req, res) {
    pool.query('SELECT * FROM bookings')
        .then((result) => res.json(result.rows))
        .catch((error) => {
            console.error(error);
            res.status(500).json(error);
        });
});


app.listen(port, function () {
    console.log(`The server is listening on port ${port}`);
});
