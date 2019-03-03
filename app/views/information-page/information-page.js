const frameModule = require("tns-core-modules/ui/frame");
const InformationViewModel = require("./information-view-model");

let informationViewModel;

function pageLoaded(args)
{
    informationViewModel = new InformationViewModel();

    const page = args.object;
    page.bindingContext = informationViewModel;
}

exports.pageLoaded = pageLoaded;