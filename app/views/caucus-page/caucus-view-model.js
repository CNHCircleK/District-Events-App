const observableModule = require("data/observable");
const ObservableArray = require("data/observable-array").ObservableArray;

var viewModel;

function CaucusViewModel()
{
    viewModel = observableModule.fromObject({
        numCaucus: "Caucus 1",
        date: "Friday, 3:00p--12:00mn",
        data: new ObservableArray([
            { 
                title: "Foothill & Desert Oasis",
                location: "Ballroom A" 
            },
            { 
                title: "Magic Kingdom",
                location: "MR 2 & 3" 
            }
        ])
    });

    return viewModel;
}

module.exports = CaucusViewModel;