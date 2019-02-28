var frameModule = require("tns-core-modules/ui/frame");
var BlockDetailViewModel = require("./block-detail-view-model");

var blockDetailViewModel;

function onNavigatedTo(args)
{
    var context = args.context;
    var eventId = context.id;
    blockDetailViewModel = new BlockDetailViewModel(eventId);

    var page = args.object;
    page.bindingContext = blockDetailViewModel;

    blockDetailViewModel.initialize();
}

exports.onNavigatedTo = onNavigatedTo;