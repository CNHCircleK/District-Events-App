const observableModule = require("tns-core-modules/data/observable");


let viewModel;

function PDFViewViewModel(context)
{
    viewModel = observableModule.fromObject({
        pdfUrl: context.pdfUrl
    });

    return viewModel;
}

module.exports = PDFViewViewModel;