const frameModule = require("tns-core-modules/ui/frame");
const ScheduleViewModel = require("./schedule-view-model");


let scheduleViewModel;

function pageLoaded(args)
{
    scheduleViewModel = new ScheduleViewModel();

    const page = args.object;
    page.bindingContext = scheduleViewModel;

    scheduleViewModel.initialize();
}

function onTouch(args)
{
    const eventItem = args.object;
    const eventType = eventItem.typeEvent;

    if(typeof eventType == "string")
    {
        switch(args.action)
        {
            case "down":
                eventItem.class = "row-card row-card-selected";
                break;
            case "cancel":
                eventItem.class = "row-card";
                break;
            case "up":
                eventItem.class = "row-card"

                const navigationEntry = {
                    context: { id: eventItem.id, date: eventItem.date },
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
                break;
        }
    }
}

exports.pageLoaded = pageLoaded;
exports.onTouch = onTouch;