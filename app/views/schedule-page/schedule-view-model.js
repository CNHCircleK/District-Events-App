const observableModule = require("data/observable");
const ObservableArray = require("data/observable-array").ObservableArray;
const fileSystemModule = require("tns-core-modules/file-system");


function ScheduleViewModel()
{
    const viewModel = observableModule.fromObject({ 
        data: new ObservableArray(),
        initialize: function() {
            setSchedule(this);
        } 
    });

    return viewModel;
}

function setSchedule(viewModel)
{
    const documents = fileSystemModule.knownFolders.documents();
    const folder = documents.getFolder("data");

    const firstDayFile = folder.getFile("first_day_schedule");
    const secondDayFile = folder.getFile("second_day_schedule");
    const thirdDayFile = folder.getFile("third_day_schedule");

    const firstDayEvents = new ObservableArray();
    const secondDayEvents = new ObservableArray();
    const thirdDayEvents = new ObservableArray();

    viewModel.data.push({ date: "March 22, 2019", events: firstDayEvents });
    viewModel.data.push({ date: "March 23, 2019", events: secondDayEvents });
    viewModel.data.push({ date: "March 24, 2019", events: thirdDayEvents });

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

module.exports = ScheduleViewModel;