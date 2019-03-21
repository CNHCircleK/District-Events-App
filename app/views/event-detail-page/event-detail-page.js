const frameModule = require("tns-core-modules/ui/frame");
const EventDetailViewModel = require("./event-detail-view-model");


let eventDetailViewModel;

function onNavigatedTo(args)
{
    const context = args.context;
    eventDetailViewModel = new EventDetailViewModel(context);

    const page = args.object;
    page.bindingContext = eventDetailViewModel;

    eventDetailViewModel.initialize();
}

function goBack(args)
{
    const button = args.object;
    const page = button.page;
    page.frame.goBack();
}

exports.onNavigatedTo = onNavigatedTo;
exports.goBack = goBack;