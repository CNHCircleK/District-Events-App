const observableModule = require("data/observable");
const ObservableArray = require("data/observable-array").ObservableArray;
const fileSystemModule = require("tns-core-modules/file-system");


function CaucusBlockViewModel(context)
{
    const viewModel = observableModule.fromObject({
        title: "",
        dateTime: "",
        data: new ObservableArray(),
        id: context.id,
        caucus: context.caucusNumber,
        initialize: function() {
            setCaucuses(this);
        }
    });

    return viewModel;
}

function setCaucuses(viewModel)
{
    viewModel.title = "";
    viewModel.dateTime = "";
    while(viewModel.data.length)
    {
        viewModel.data.pop();
    }

    const documents = fileSystemModule.knownFolders.documents();
    const folder = documents.getFolder("data");

    const caucusFile = folder.getFile("caucuses");
    let dayFile;
    if(viewModel.caucus == 1)
        dayFile = folder.getFile("first_day_schedule");
    else if(viewModel.caucus == 2)
        dayFile = folder.getFile("second_day_schedule");

    dayFile.readText().then(text => {
        const dayObj = JSON.parse(text);
        dayObj.daySchedule.some(eventObj => {
            if(eventObj.id == viewModel.id)
            {
                viewModel.title = eventObj.title;
                viewModel.dateTime = eventObj.date + "; " + eventObj.sTime + "--" + eventObj.eTime;
                return true;
            }
        });
    });

    caucusFile.readText().then(text => {
        const blockObj = JSON.parse(text);
        blockObj.caucuses.forEach(caucusObj => {
            viewModel.data.push(caucusObj);
        });
    });
}

module.exports = CaucusBlockViewModel;