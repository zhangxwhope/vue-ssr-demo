const serverBundle = require("./dist/vue-ssr-server-bundle.json");
const clientManifest = require("./dist/vue-ssr-client-manifest.json");

const express = require("express");
const server = express();

const renderer = require("vue-server-renderer").createBundleRenderer(
  serverBundle,
  {
    runInNewContext: false,
    template: require("fs").readFileSync("./index.template.html", "utf-8"),
    clientManifest
  }
);

const path = require("path");

//引入静态文件  否则运行报错
server.use("/js", express.static(path.resolve(__dirname, "./dist/js")));
server.use("/img", express.static(path.resolve(__dirname, "./dist/img")));
server.use("/css", express.static(path.resolve(__dirname, "./dist/css")));

server.get("*", (req, res) => {
  const context = {
    title: "vue ssr demo demo",
    meta: `<meta charset="utf-8">`,
    url: req.url
  };
  renderer.renderToString(context, (err, html) => {
    if (err) {
      if (err.code === 404) {
        res.status(404).end("Page not found");
      } else {
        res.status(500).end("Internal Server Error");
      }
    } else {
      res.end(html);
    }
  });
});

server.listen(8080, () => {
  console.log("已监听 localhost:8080");
});
