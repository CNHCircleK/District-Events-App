const observableModule = require("data/observable");
const firebase = require("nativescript-plugin-firebase/app");


function LoginViewModel()
{
    const viewModel = observableModule.fromObject({
        password: "",
        update: function() {
            updateViewModel(this);
        }
    });

    return viewModel;
}

function updateViewModel(viewModel)
{

}

module.exports = LoginViewModel;