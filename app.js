import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import indexRouter from "./routes/index.js"
import aboutRouter from "./routes/about.js"

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===== Middleware =====
app.set("view engine", "ejs");      // Set View Engine as EJS / EJS points to the views folder by default (1)
app.use(express.json());            // Parse JSON Bodies / to have access to req.body (2)
app.use(express.static("public"))   // Serve static files / static files middleware/route handler (3)
app.use(morgan("dev"));             // Log every request

// ===== Routes =====
app.use("/", indexRouter)           //Routes
app.use("/about", aboutRouter)





// ===== 404 handler =====
app.use((req, res) => {             // 404 HANDLER - add variable to mention the req url ?
    res.status(404).render("404")   
})

// ===== Error handler =====
app.use((err, req, res, next) => {  // ERROR HANDLER (6)
    console.error(err);
    res.status(err.statusCode || 500).send(err)
})

// ===== Start server =====
app.listen(PORT, (err) => { 
    if(err){
        throw err
    }
    console.log(`Server running on http://localhost:${PORT}`) 
})

/*
(1) EJS points to the views folder by default
    When you do: app.set("view engine", "ejs");
    Express automatically looks for templates inside a folder named views/ at the root of your project.
    So if you keep your EJS files in ./views, you don’t need to set "views" manually.
    to explicitly set the folder: app.set("views", path.join(__dirname, "views"));
*/

/*
(2) BODY - what express.json() does:
Parses incoming requests with Content-Type: application/json.
    Puts the parsed data into req.body.
    Without it, req.body would be undefined when handling JSON payloads (like in a POST).
*/

/*
(3) STATIC FILES:
    express.static("public") creates middleware that serves files directly from the public/ directory.
    If a request matches a file in public/, send that file as-is instead of running any route logic.
    app.use(...) mounts that middleware globally, so it runs for every request 
    before hitting your custom routes.
*/

/*
(4) ERROR HANDLER - custom from the error class extension
    We can now specify the `err.statusCode` that exists in our custom error class 
    and if it does not exist it's probably an internal server error
*/

/*
(5) 

*/
/*
() 

*/