const frameModule = require("tns-core-modules/ui/frame");
const WorkshopBlockViewModel = require("./workshop-block-view-model");


let workshopBlockViewModel;

function onNavigatedTo(args)
{
    const context = args.context;
    workshopBlockViewModel = new WorkshopBlockViewModel(context);

    var page = args.object;
    page.bindingContext = workshopBlockViewModel;

    workshopBlockViewModel.initialize();
}

function goBack(args)
{
    const button = args.object;
    const page = button.page;
    page.frame.goBack();
}

exports.onNavigatedTo = onNavigatedTo;
exports.goBack = goBack;
