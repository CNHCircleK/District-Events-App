const frameModule = require("tns-core-modules/ui/frame");
const appModule = require("tns-core-modules/application");
const LoginViewModel = require("./login-view-model");


let loginViewModel;

function pageLoaded(args)
{
    loginViewModel = new LoginViewModel();

    const page = args.object;
    page.bindingContext = loginViewModel;

    loginViewModel.initialize();
}

function onTap(args)
{
    const rootView = appModule.getRootView();
    const passField = rootView.getViewById("passField");

    const navigationEntry = {
        moduleName: "views/loading-page/loading-page",
        transition: { name:  "slideTop" }
    };

    if(passField.text == "yeehaw!")
        frameModule.topmost().navigate(navigationEntry);
}

exports.pageLoaded = pageLoaded;
exports.onTap = onTap;