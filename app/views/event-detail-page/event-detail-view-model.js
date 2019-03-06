const observableModule = require("data/observable");
const ObservableArray = require("data/observable-array").ObservableArray;
const fileSystemModule = require("tns-core-modules/file-system");


function EventDetailViewModel(context)
{
    var viewModel = observableModule.fromObject({
        title: "",
        dateTime: "",
        location: "",
        id: context.id,
        date: context.date,
        agenda: new ObservableArray(),
        initialize: function() {
            setEventData(this);
        }
    });
    
    return viewModel;
}

function setEventData(viewModel)
{
    const documents = fileSystemModule.knownFolders.documents();
    const folder = documents.getFolder("data");

    let dayFile;
    if(viewModel.date == "March 22, 2019")
        dayFile = folder.getFile("first_day_schedule");
    else if(viewModel.date == "March 23, 2019")
        dayFile = folder.getFile("second_day_schedule");
    else if(viewModel.date == "March 24, 2019")
        dayFile = folder.getFile("third_day_schedule");

    dayFile.readText().then(text => {
        const dayObj = JSON.parse(text);
        dayObj.daySchedule.some(eventObj => {
            if(viewModel.id == eventObj.id)
            {
                viewModel.title = eventObj.title;
                viewModel.dateTime = eventObj.date + "; " + eventObj.sTime + "--" + eventObj.eTime;
                viewModel.location = eventObj.location;
                eventObj.agenda.forEach(item => {
                    viewModel.agenda.push({ agendaItem: item });
                });
                return true;
            }
        });
    });
}

module.exports = EventDetailViewModel;