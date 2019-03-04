const frameModule = require("tns-core-modules/ui/frame");
const ScheduleViewModel = require("./schedule-view-model");


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
    const eventItem = args.object;
    const eventType = eventItem.typeEvent;

    const navigationEntry = {
        context: { id: eventItem.id },
        transition: { name:  "slideTop" }
    };
    
    let pageToNavigateTo;
    switch(eventType)
    {
        case "event":
            pageToNavigateTo = "event-detail-page";
            break;
        case "caucus":
            pageToNavigateTo = "caucus-block-page";
            navigationEntry.context.caucusNumber = eventItem.caucus;
            break;
        case "workshop":
            pageToNavigateTo = "workshop-block-page";
            navigationEntry.context.workshopNumber = eventItem.workshop;
            break;
    }
    
    navigationEntry.moduleName = "views/" + pageToNavigateTo + "/" + pageToNavigateTo;

    frameModule.getFrameById("main-display").navigate(navigationEntry);
}

exports.pageLoaded = pageLoaded;
exports.onNavigatedTo = onNavigatedTo;
exports.onTap = onTap;