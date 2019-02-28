var frameModule = require("tns-core-modules/ui/frame");
var ScheduleViewModel = require("./schedule-view-model");


function pageLoaded(args)
{
    var scheduleViewModel = new ScheduleViewModel();

    var page = args.object;
    page.bindingContext = scheduleViewModel;

    scheduleViewModel.initialize();
}

function onTap(args)
{
    var eventButton = args.object;
    var eventId = eventButton.id;
    var isEventBlock = eventButton.block;

    var navigateToPage = "event-detail-page";
    if(isEventBlock)
        navigateToPage = "block-detail-page";

    var navigationEntry = {
        moduleName: "views/" + navigateToPage + "/" + navigateToPage,
        context: { id: eventId },
        transition: { name:  "slideTop" }
    };

    frameModule.getFrameById("main-display").navigate(navigationEntry);
}

exports.pageLoaded = pageLoaded;
exports.onTap = onTap;