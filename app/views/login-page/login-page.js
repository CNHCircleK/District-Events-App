const frameModule = require("tns-core-modules/ui/frame");
const appModule = require("tns-core-modules/application");
const LoginViewModel = require("./login-view-model");
const fileSystemModule = require("tns-core-modules/file-system");


let loginViewModel;

function pageLoaded(args)
{
    loginViewModel = new LoginViewModel();

    const page = args.object;
    page.bindingContext = loginViewModel;

    loginViewModel.initialize();

    checkPreviouslyLogin();
}

function onTap(args)
{
    const rootView = appModule.getRootView();
    const passField = rootView.getViewById("passField");

    const navigationEntry = {
        moduleName: "views/loading-page/loading-page",
        transition: { name:  "slideTop" }
    };

    if(passField.text.trim() == "yeehaw!")
    {
        markPreviouslyLogin();
        frameModule.topmost().navigate(navigationEntry);
    }
}

function checkPreviouslyLogin()
{
    const documents = fileSystemModule.knownFolders.documents();
    const folder = documents.getFolder("data");
    const rememPassFile = folder.getFile("remember_password");

    rememPassFile.readText().then(text => {
        if(text == "true")
            return true;
        else
            return false;
    }).then(previouslyLogin => {
        if(previouslyLogin)
        {
            const navigationEntry = {
                moduleName: "views/loading-page/loading-page",
                transition: { name:  "slideTop" }
            };
        
            frameModule.topmost().navigate(navigationEntry);
        }
    });
}

function markPreviouslyLogin()
{
    const documents = fileSystemModule.knownFolders.documents();
    const folder = documents.getFolder("data");
    const rememPassFile = folder.getFile("remember_password");

    rememPassFile.writeText("true");
}

exports.pageLoaded = pageLoaded;
exports.onTap = onTap;