var frameModule = require("tns-core-modules/ui/frame");
var EventDetailViewModel = require("./event-detail-view-model");

var eventDetailViewModel = new EventDetailViewModel();

function pageLoaded(args)
{
    var page = args.object;
    page.bindingContext = eventDetailViewModel;
}

exports.pageLoaded = pageLoaded;