var frameModule = require("tns-core-modules/ui/frame");
var WorkshopViewModel = require("./workshop-view-model");

var workshopViewModel = new WorkshopViewModel();

function pageLoaded(args)
{
    var page = args.object;
    page.bindingContext = workshopViewModel;
}

exports.pageLoaded = pageLoaded;