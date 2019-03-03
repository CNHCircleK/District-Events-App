const frameModule = require("tns-core-modules/ui/frame");
const appModule = require("tns-core-modules/application");
const ScheduleViewModel = require("./schedule-view-model");


let scheduleViewModel;

function pageLoaded(args)
{
    if(!global.scheduleViewModel)
    {
        global.scheduleViewModel = new ScheduleViewModel();
    }

    const page = args.object;
    page.bindingContext = global.scheduleViewModel;
}

function onNavigatedTo()
{
    if(!global.scheduleViewModel.initialized)
    {
        global.scheduleViewModel.initialize();
        global.scheduleViewModel.initialized = true;
    }
}

function onTap(args)
{
    const eventButton = args.object;
    const eventId = eventButton.id;
    // var isEventBlock = eventButton.block;

    const navigateToPage = "event-detail-page";
    // if(isEventBlock)
    //     navigateToPage = "block-detail-page";

    const navigationEntry = {
        moduleName: "views/" + navigateToPage + "/" + navigateToPage,
        context: { id: eventId },
        transition: { name:  "slideTop" }
    };

    frameModule.getFrameById("main-display").navigate(navigationEntry);
}

exports.pageLoaded = pageLoaded;
exports.onNavigatedTo = onNavigatedTo;
exports.onTap = onTap;