const observableModule = require("tns-core-modules/data/observable");


function LoadingViewModel()
{
    const viewModel = observableModule.fromObject({
        progressValue: 0,
        minValue: 0,
        maxValue: 100,
        initialize: function() { 
            initialize(this); 
        }
    });

    return viewModel;
}

function initialize(viewModel)
{
    setInterval(() => {
        if(viewModel.progressValue == viewModel.maxValue)
            viewModel.progressValue = viewModel.minValue;
        else
            viewModel.progressValue += 1;
    }, 5);
}

module.exports = LoadingViewModel;