var frameModule = require("tns-core-modules/ui/frame");
var ScheduleViewModel = require("./schedule-view-model");

var scheduleViewModel = new ScheduleViewModel();

function pageLoaded(args)
{
    var page = args.object;
    page.bindingContext = scheduleViewModel;
}

function onTap(args)
{
    var eventButton = args.object;
    var eventId = eventButton.id;
    var eventBlock = eventButton.block;

    var navigateToPage = "event-detail-page";
    if(eventBlock)
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