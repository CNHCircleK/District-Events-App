const observableModule = require("data/observable");
const ObservableArray = require("data/observable-array").ObservableArray;

var viewModel;

function WorkshopViewModel()
{
    viewModel = observableModule.fromObject({
        numWorkshop: "Workshop 1",
        date: "Friday, 3:00p--12:00mn",
        data: new ObservableArray([
            { 
                title: "Dog Toy Making",
                author: "Winston Chu",
                description: "Demonstration of a dog toy making tabletop service project.",
                location: "Ballroom A" 
            },
            { 
                title: "Graphic Design",
                author: "Ryan Hoang",
                description: "Learn the basic how-tos of the district's graphic design standards.",
                location: "MR 2 & 3" 
            }
        ])
    });

    return viewModel;
}

module.exports = WorkshopViewModel;