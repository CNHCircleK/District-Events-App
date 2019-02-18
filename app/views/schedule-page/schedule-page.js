var frameModule = require("tns-core-modules/ui/frame");
var ScheduleViewModel = require("./schedule-view-model");

var scheduleViewModel = new ScheduleViewModel();

function pageLoaded(args)
{
    var page = args.object;
    page.bindingContext = scheduleViewModel;
}

exports.pageLoaded = pageLoaded;