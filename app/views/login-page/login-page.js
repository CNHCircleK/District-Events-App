const frameModule = require("tns-core-modules/ui/frame");
const fileSystemModule = require("tns-core-modules/file-system");
const LoginViewModel = require("./login-view-model");


function pageLoaded(args)
{
    const loginViewModel = new LoginViewModel();

    const page = args.object;
    page.bindingContext = loginViewModel;

    loginViewModel.update();

    const documents = fileSystemModule.knownFolders.documents();
    const folder = documents.getFolder("data");
    const file = folder.getFile("backend_data");
    file.writeText("Text has been written");
    loginViewModel.update();
}

function onTap(args)
{
    const navigationEntry = {
        moduleName: "views/home-page/home-page",
        transition: { name:  "slideTop" }
    };

    frameModule.topmost().navigate(navigationEntry);
}

exports.pageLoaded = pageLoaded;
exports.onTap = onTap;