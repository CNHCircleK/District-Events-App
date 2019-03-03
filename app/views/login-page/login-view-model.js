const observableModule = require("data/observable");
const firebase = require("nativescript-plugin-firebase/app");


function LoginViewModel()
{
    const viewModel = observableModule.fromObject({
        initialize: function() { 
            initialize(this); 
        }
    });

    return viewModel;
}

function initialize(viewModel)
{

}

module.exports = LoginViewModel;