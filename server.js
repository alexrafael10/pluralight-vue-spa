const { response } = require("express");
const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

const indexHtml = (() => {
    return fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf-8");
})();

app.use("/dist", express.static(path.resolve(__dirname, "./dist")));

require("./build/dev-server")(app);

app.get("*", (req, res) => {
    res.write(indexHtml);
    res.end();
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
});