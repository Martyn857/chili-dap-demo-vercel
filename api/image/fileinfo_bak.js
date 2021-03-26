const fs = require("fs");
const {join} = require('path');
const sizeOf = require('image-size');

module.exports = (req, res) => {
    const {
        query: { path, name },
    } = req

    let image = null;

    try {
        image = fs.readFileSync(join(__dirname, 'images', `/${path}/${name}.jpg`));
    }
    catch (e) {

    }

    if (image == null) {
        image = fs.readFileSync(join(__dirname, 'images', `/404.jpg`));
    }

    const dimensions = sizeOf(image);
    const xml = ``
        +`<item name="${name}.jpg">`
        + `<fileInfo resolution="72" width="${dimensions.width}" height="${dimensions.height}">`
        + `<metaData>`
        + `<width>${dimensions.width}</width>`
        + `<height>${dimensions.height}</height>`
        + `<resolution>72</resolution>`
        + `</metaData>`
        + `</fileInfo>`
        + `</item>`;

    res.setHeader("Content-Type", "text/xml");
    res.send(xml);
}