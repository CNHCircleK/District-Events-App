const fileSystemModule = require("tns-core-modules/file-system");
const observableModule = require("tns-core-modules/data/observable");


function onLoaded(args)
{
    const docs = fileSystemModule.knownFolders.currentApp().path;
    const filepath = fileSystemModule.path.join(docs, "resources/pdfs", "map.pdf");

    const page = args.object;
    page.bindingContext = observableModule.fromObject({
        pdfUrl: filepath
    });
}

exports.onLoaded = onLoaded;