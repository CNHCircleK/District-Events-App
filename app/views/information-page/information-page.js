var frameModule = require("tns-core-modules/ui/frame");
var InformationViewModel = require("./information-view-model");

var informationViewModel = new InformationViewModel();

function pageLoaded(args)
{
    var page = args.object;
    page.bindingContext = informationViewModel;
}

exports.pageLoaded = pageLoaded;