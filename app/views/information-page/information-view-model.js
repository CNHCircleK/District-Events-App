const observableModule = require("data/observable");
const ObservableArray = require("data/observable-array").ObservableArray;

var viewModel;

function InformationViewModel()
{
    viewModel = observableModule.fromObject({
        data: new ObservableArray([
            {
                infoTitle: "Welcomes",
                items: new ObservableArray([
                    { infoCategory: "Manuel Santiago", infoName: "District Governor", hasName: true },
                    { infoCategory: "Jennifer Hoang", infoName: "DCON Chair", hasName: true },
                ])
            },
            {
                infoTitle: "General",
                items: new ObservableArray([
                    { infoCategory: "Code of Conduct", hasName: false },
                    { infoCategory: "Dress Codes", hasName: false },
                ])
            },
            {
                infoTitle: "CNH",
                items: new ObservableArray([
                    { infoCategory: "District Board", hasName: false },
                    { infoCategory: "DCON Committee", hasName: false },
                ])
            },
            {
                infoTitle: "Elections",
                items: new ObservableArray([
                    { infoCategory: "Candidate Literature", hasName: false },
                    { infoCategory: "Caucus Rules", hasName: false },
                ])
            },
        ])
    });

    return viewModel;
}

module.exports = InformationViewModel;