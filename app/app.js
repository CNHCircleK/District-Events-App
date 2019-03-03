/*
In NativeScript, the app.js file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/
const application = require("tns-core-modules/application");
const firebase = require("nativescript-plugin-firebase/app");


firebase.initializeApp({
    // Optionally pass in properties for database, authentication and cloud messaging,
    // see their respective docs.
}).then(
  function () {
    console.log("firebase.init done");
  },
  function (error) {
    console.log("firebase.init error: " + error);
  }
);

// Disable back button across app
if (application.android) {
  application.android.on(application.AndroidApplication.activityBackPressedEvent, (args) => {
    args.cancel = true;
  });
}

application.run({ moduleName: "app-root" });

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
