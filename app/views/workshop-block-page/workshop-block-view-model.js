const observableModule = require("data/observable");
const ObservableArray = require("data/observable-array").ObservableArray;
const fileSystemModule = require("tns-core-modules/file-system");


function WorkshopBlockViewModel(context)
{
    const viewModel = observableModule.fromObject({
        title: "",
        dateTime: "",
        data: new ObservableArray(),
        id: context.id,
        date: context.date,
        workshop: context.workshopNumber,
        initialize: function() {
            setWorkshops(this);
        }
    });

    return viewModel;
}

function setWorkshops(viewModel)
{
    const documents = fileSystemModule.knownFolders.documents();
    const folder = documents.getFolder("data");
    
    let wsFile;
    switch(viewModel.workshop)
    {
        case 1: 
            wsFile = folder.getFile("workshop_one");
            break;
        case 2:
            wsFile = folder.getFile("workshop_two");
            break;
        case 3:
            wsFile = folder.getFile("workshop_three");
            break;
        case 4:
            wsFile = folder.getFile("workshop_four");
            break;
        case 5:
            wsFile = folder.getFile("workshop_five");
            break;
        case 6:
            wsFile = folder.getFile("workshop_six");
            break;
        case 7:
            wsFile = folder.getFile("workshop_seven");
            break;
        case 8:
            wsFile = folder.getFile("workshop_eight");
            break;
    }

    let dayFile;
    if(viewModel.date == "March 22, 2019")
        dayFile = folder.getFile("first_day_schedule");
    else if(viewModel.date == "March 23, 2019")
        dayFile = folder.getFile("second_day_schedule");
        
    dayFile.readText().then(text => {
        const dayObj = JSON.parse(text);
        dayObj.daySchedule.some(eventObj => {
            if(viewModel.id == eventObj.id)
            {
                viewModel.title = eventObj.title;
                viewModel.dateTime = eventObj.date + "; " + eventObj.sTime + "--" + eventObj.eTime;
                return true;
            }
        });
    });

    wsFile.readText().then(text => {
        const blockObj = JSON.parse(text);
        blockObj.workshops.forEach(wsObj => {
            viewModel.data.push(wsObj);
        });
    });
}

module.exports = WorkshopBlockViewModel;