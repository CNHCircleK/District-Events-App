/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/
const frameModule = require("tns-core-modules/ui/frame");
const appModule = require("tns-core-modules/application");


function switchTabs(args)
{
    const tappedTab = args.object;
    const rootView = appModule.getRootView();
    const navBar = rootView.getViewById("navbar");

    navBar.eachChildView(view => {
        view.class = "bottom-nav-btn";
    });

    tappedTab.class = "bottom-nav-btn btn-active";

    const navigationEntry = {
        moduleName: "views/" + tappedTab.id + "/" + tappedTab.id,
        transition: { name:  "fade" }
    };

    frameModule.getFrameById("main-display").navigate(navigationEntry);
}

exports.switchTabs = switchTabs;

