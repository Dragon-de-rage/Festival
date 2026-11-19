const express = require('express');
const app = express();
const path = require("node:path");
const port = 8080;
const hbs = require("hbs");
require('dotenv').config({ path: './atlas-credentials.env' }); // pour récupérer les strings de connection du .env

// initialisation de MongoDB
const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
async function connectToMongoDB() {
    try {
        await client.connect();
        console.log("You successfully connected to MongoDB!");
        return client;
    } catch (err) {
        console.dir(err);
    }
}
// Call this only when your application terminates
async function disconnectFromMongoDB() {
    await client.close();
}

// Configuration de Handlebars pour Express
app.set("view engine", "hbs"); // On définit le moteur de template qu'Express va utiliser
app.set("views", path.join(__dirname, "views")); // On définit le dossier des vues (dans lequel se trouvent les fichiers ".hbs")
app.use(express.static(path.join(__dirname, "public"))); // On définit le dossier des ressources (css, images, polices...)
hbs.registerPartials(path.join(__dirname, "views", "partials")); // On définit le dossier des partials (composants e.g. header, footer, menu...)

app.get('/', (req, res) => {
    connectToMongoDB();
    res.render('index', {/*css: "/css/index.css"*/});
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})