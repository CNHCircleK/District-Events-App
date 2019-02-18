const observableModule = require("data/observable");
const ObservableArray = require("data/observable-array").ObservableArray;

function ScheduleViewModel()
{
    const viewModel = observableModule.fromObject({
        data: new ObservableArray([
            { date: "Friday, Mar 19", schedule: new ObservableArray([{ heading: "First", content: "first description" },
                                                                     { heading: "First", content: "first description" }]) },
            { date: "Saturday, Mar 20", schedule: new ObservableArray([{ heading: "Second", content: "second description" },
                                                                       { heading: "Second", content: "second description" }]) }
        ])
    });

    return viewModel;
}

module.exports = ScheduleViewModel;