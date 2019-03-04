const frameModule = require("tns-core-modules/ui/frame");
const CaucusBlockViewModel = require("./caucus-block-view-model");


let caucusBlockViewModel;

function onNavigatedTo(args)
{
    const context = args.context;
    caucusBlockViewModel = new CaucusBlockViewModel(context);

    var page = args.object;
    page.bindingContext = caucusBlockViewModel;

    caucusBlockViewModel.initialize();
}

function goBack(args)
{
    const button = args.object;
    const page = button.page;
    page.frame.goBack();
}

exports.onNavigatedTo = onNavigatedTo;
exports.goBack = goBack;