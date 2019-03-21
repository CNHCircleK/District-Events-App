const frameModule = require("tns-core-modules/ui/frame");
const PDFViewViewModel = require("./pdf-view-view-model");


let pdfViewViewModel;

function onNavigatedTo(args)
{
    const context = args.context;
    pdfViewViewModel = new PDFViewViewModel(context);

    const page = args.object;
    page.bindingContext = pdfViewViewModel;
}

function goBack(args)
{
    const button = args.object;
    const page = button.page;
    page.frame.goBack();
}

exports.onNavigatedTo = onNavigatedTo;
exports.goBack = goBack;