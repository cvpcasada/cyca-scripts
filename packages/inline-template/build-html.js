const posthtml = require("posthtml");
const posthtmlInlineAssets = require("posthtml-inline-assets");
const fs = require("fs");

posthtml([
  posthtmlInlineAssets({
    root: "./dist"
  })
])
  .process(fs.readFileSync("./dist/index.html"))
  .then(res => fs.writeFileSync('./dist/startup.html', res.html));