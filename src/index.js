const path = require('path');
const fs = require('fs');

const generateSitemap = (rootFilePath) => {
  const htmlFiles = parseFiles(rootFilePath);
  writeSitemap(htmlFiles, rootFilePath);
}

const parseFiles = (filePath) => {
  let files = [];
  const fileStats = fs.lstatSync(filePath);

  console.log(filePath, fileStats.isDirectory())
  if (fileStats.isDirectory()) {
    fs.readdirSync(filePath).forEach(file => {
      const newFilePath = filePath + "/" + file;
      files = files.concat(parseFiles(newFilePath));
    });
    return files;
  } else {
    return isHtmlFile(filePath) ? [filePath] : [];
  }
}

const isHtmlFile = (path) => {
  return path.endsWith(".html");
}

const writeSitemap = (htmlFiles, outputPath) => {
  let urlElements = "";
  htmlFiles.map(htmlFile => {
    urlElements = urlElements.concat(`
  <url>
    <loc>${htmlFile}</loc>
  </url>`)});
  let content = /** sitemap.xml */
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlElements}
</urlset>`

  fs.writeFile(`${outputPath}/sitemap.xml`, content, err => {
    if (err) {
      console.error(err);
    }
  });
}

module.exports = generateSitemap