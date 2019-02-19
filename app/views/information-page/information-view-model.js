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
                    { infoCategory: "Manuel Santiago", infoName: "District Governor" },
                    { infoCategory: "Jennifer Hoang", infoName: "DCON Chair" },
                ])
            },
            {
                infoTitle: "General",
                items: new ObservableArray([
                    { infoCategory: "Code of Conduct", infoName: "" },
                    { infoCategory: "Dress Codes", infoName: "" },
                ])
            },
            {
                infoTitle: "CNH",
                items: new ObservableArray([
                    { infoCategory: "District Board", infoName: "" },
                    { infoCategory: "DCON Committee", infoName: "" },
                ])
            },
            {
                infoTitle: "Elections",
                items: new ObservableArray([
                    { infoCategory: "Candidate Literature", infoName: "" },
                    { infoCategory: "Caucus Rules", infoName: "" },
                ])
            },
        ])
    });

    return viewModel;
}

module.exports = InformationViewModel;