#!/usr/bin/env node
let program = require("commander");
const yarnif = require("yarnif");
const makeNewProject = require("../lib/makeNewProject");
const copyAndReplace = require("../lib/copyAndReplace");
const fs = require("fs");
const spawnSync = require("child_process").spawnSync;
const chdir = require("process").chdir;
const cwd = require("process").cwd;
const opts = {
  encoding: "utf8",
  stdio: "inherit"
};
function validateModuleName(name) {
  if (!name.match(/^[$A-Z_][0-9A-Z\-_$]*$/i)) {
    console.error(
      '"%s" is not a valid name for a module. Please use a valid identifier ' +
        "name (alphanumeric with dashes).",
      name
    );
    process.exit(1);
  }
}
function validateAppName(name) {
  if (!name.match(/^[$A-Z_][0-9A-Z\_$]*$/i)) {
    console.error(
      '"%s" is not a valid name for a react-native app. Please use a valid identifier ' +
        "name (alphanumeric).",
      name
    );
    process.exit(1);
  }
}
program
  .command("init <projectname> [projectpath]")
  .alias("i")
  .description("Initialize a new swift-based native module project")
  .action(function(projectname, projectpath) {
    validateModuleName(projectname);
    if (!projectpath) projectpath = "./" + projectname;
    makeNewProject(projectname, projectpath);
    chdir(projectpath);
    yarnif.addDevDependency("react-native-swift-bridge");
    yarnif.addDevDependency("react-native-pod");
    spawnSync("yarn", ["run", "react-native-swift-bridge"], opts);
    spawnSync("yarn", ["link"], opts);
  });

program
  .command("makeapp <appprojectname> <pathToSwiftProject> [appprojectpath]")
  .alias("m")
  .description(
    "Create a blank app that adds a swift module to make development easier"
  )
  .action(function(appname, swiftpath, appprojectpath) {
    validateAppName(appname);
    if (!appprojectpath) appprojectpath = "./" + appname;
    if (["/", "."].indexOf(swiftpath.substring(0, 1)) == -1)
      swiftpath = "./" + swiftpath;
    if (swiftpath.substring(0, 1) != "/") swiftpath = cwd() + "/" + swiftpath;
    if (!fs.existsSync(swiftpath + "/package.json")) {
      console.log("There is no valid project at the path: " + swiftpath + "\n");
      return;
    }
    const swiftjson = require(swiftpath + "/package.json");
    const swiftprojectname = swiftjson.name;

    spawnSync("react-native", ["init", appname, appprojectpath], opts);
    chdir(appprojectpath);
    spawnSync("yarn", ["add", "react-native-swift"], opts);
    spawnSync("yarn", ["link", swiftprojectname], opts);
    spawnSync("yarn", ["add", swiftpath], opts);
    spawnSync(
      "yarn",
      [
        "add",
        "react-native-fix-pod-links",
        "react-native-xcode",
        "react-native-setdevteam",
        "react-native-bundlebase",
        "react-native-fix-ios-version",
        "react-native-camera-ios-enable"
      ],
      opts
    );
    spawnSync("react-native", ["addpodlinks"], opts);
    spawnSync("react-native", ["setdevteam"], opts);
    spawnSync("react-native", ["link"], opts);
    copyAndReplace(__dirname + "/../templates/App.js", "./App.js", {
      rnswifttemplate: swiftprojectname
    });
    console.log(
      'Done. To edit your project in xcode, type "react-native xcode"\nNote that if you want to deploy a cocoapod in this app (e.g. after running addpod on your module), you should "yarn add react-native-pod"'
    );
  });
program
  .command("*")
  .description("All malformed commands display this help")
  .action(function() {
    program.outputHelp();
  });
program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
