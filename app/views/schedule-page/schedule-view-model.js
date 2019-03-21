const observableModule = require("tns-core-modules/data/observable");
const ObservableArray = require("tns-core-modules/data/observable-array").ObservableArray;
const fileSystemModule = require("tns-core-modules/file-system");


function ScheduleViewModel()
{
    const viewModel = observableModule.fromObject({ 
        data: new ObservableArray(),
        initialize: function() {
            setSchedule(this);
        },
        onLoadMoreDataRequested: function(args) {
            loadMoreData(args);
        }
    });

    return viewModel;
}

function setSchedule(viewModel)
{
    while(viewModel.data.length)
    {
        viewModel.data.pop();
    }

    const documents = fileSystemModule.knownFolders.documents();
    const folder = documents.getFolder("data");

    const firstDayFile = folder.getFile("first_day_schedule");
    const secondDayFile = folder.getFile("second_day_schedule");
    const thirdDayFile = folder.getFile("third_day_schedule");

    let firstDayEvents = new ObservableArray();
    let secondDayEvents = new ObservableArray();
    let thirdDayEvents = new ObservableArray();

    viewModel.data.push({ day: "Friday", date: "Mar 22", events: firstDayEvents });
    viewModel.data.push({ day: "Saturday", date: "Mar 23", events: secondDayEvents });
    viewModel.data.push({ day: "Sunday", date: "Mar 24", events: thirdDayEvents });

    firstDayFile.readText().then(text => {
        const dayObj = JSON.parse(text);
        dayObj.daySchedule.forEach(eventObj => {
            firstDayEvents.push(eventObj);
        });
    });

    secondDayFile.readText().then(text => {
        const dayObj = JSON.parse(text);
        dayObj.daySchedule.forEach(eventObj => {
            secondDayEvents.push(eventObj);
        });
    });

    thirdDayFile.readText().then(text => {
        const dayObj = JSON.parse(text);
        dayObj.daySchedule.forEach(eventObj => {
            thirdDayEvents.push(eventObj);
        });
    });    
}

function loadMoreData(eventData)
{
    const radListView = eventData.object;
    eventData.returnValue = false;
    radListView.notifyLoadOnDemandFinished(true);
}

module.exports = ScheduleViewModel;