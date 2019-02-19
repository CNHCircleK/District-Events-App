var frameModule = require("tns-core-modules/ui/frame");
var CaucusViewModel = require("./caucus-view-model");

var caucusViewModel = new CaucusViewModel();

function pageLoaded(args)
{
    var page = args.object;
    page.bindingContext = caucusViewModel;
}

exports.pageLoaded = pageLoaded;