var npm = require('npm');
var json = require('json-file-plus');
var prompt = require('synchro-prompt');
var fs = require('fs');

var jsonFile = './package.json';

/*
* The Below Process will let each developer** decide which task runner they want to use (either grunt
* or gulp) based on a command line/terminal prompt as a 'postinstall' script when running '$npm install'.
* It will download all the necessary dependencies required for the specified task runner, and will terminate this
* file and all other non-selected task runner specific files. Once the install is complete, there will be the
* necessary dependencies for grunt or gulp in the 'package.json' file.
*
*    **NOTE: It is HIGHLY RECOMMENDED that each project only use one task runner.
*            Mixing task runners will give you nightmares... Just don't do it.
*/

json(jsonFile, function (err, file) {
    if (err) { console.log(err); }

    //Prompts the user to enter their preferred task runner
    var userPrompt = function() {
        console.log("");
        var answer = prompt("Please enter your preferred Task Runner (Gulp or Grunt): ", {color: "green"});
        if (answer == "Grunt" || answer == "Gulp") {
            return answer;
        } else {
            console.log("PLEASE ENTER EITHER 'Gulp' OR 'Grunt'");
            return userPrompt();
        }
    };

    //installs the necessary dependencies for the specified task runner
    function seedProcess (depend) {
        npm.load(function () {
            console.log(depend);
            npm.commands.install(depend, function (er, data) {
                if (er) {
                    console.log(er);
                }
                else {
                    console.log("success!");
                    npm.commands.ls(function (err, data, lite) {
                        console.log(lite);
                    });
                }
            });
        })
    }

    var devDependencies = {
        Grunt: {
            "autoprefixer-core": "^5.2.0",
            "grunt": "~0.4.1",
            "grunt-bump": "0.0.6",
            "grunt-contrib-clean": "^0.4.1",
            'grunt-wrap': "^0.3.0",
            "grunt-contrib-concat": "^0.3.0",
            "grunt-contrib-copy": "^0.4.1",
            "grunt-contrib-less": "^0.11.4",
            "grunt-contrib-uglify": "^0.2.7",
            "grunt-contrib-watch": "^0.4.4",
            "grunt-conventional-changelog": "^0.1.2",
            "grunt-html2js": "^0.1.9",
            "grunt-karma": "^0.8.3",
            "grunt-less-imports": "^1.1.0",
            "grunt-ng-annotate": "^0.9.2",
            "grunt-postcss": "^0.4.0"
        },
        Gulp: {
            'gulp': '^3.9.0',
            "gulp-autoprefixer": "^2.3.1",
            'gulp-clean': '^0.3.1',
            "gulp-angular-templatecache": "^1.7.0",
            "gulp-ng-annotate": "^1.0.0",
            "gulp-concat": "^2.6.0",
            "gulp-copy": "0.0.2",
            "gulp-uglify": "^1.2.0",
            "gulp-util": "^3.0.6",
            "gulp-postcss": "^5.1.9",
            "gulp-karma": "0.0.4",
            "karma": "^0.12.31",
            "karma-firefox-launcher": "^0.1.4",
            "karma-jasmine": "^0.1.5",
            "browser-sync": "^2.7.13"
        }
    };




    //Below section runs script
    var userResponse = userPrompt();
    var dependencies = [];

    for (var key in devDependencies[userResponse]) {
        dependencies.push(key + "@" + devDependencies[userResponse][key])
    }

    seedProcess(dependencies);

    (userResponse == "Gulp") ? file.set({devDependencies: devDependencies.Gulp}) : file.set({devDependencies: devDependencies.Grunt});

    file.save().then(function () {
        console.log("sync complete");
    }).catch(function (err) {
        console.log("ERROR UPDATING 'package.json' FILE: ", err);
    });

    //Below section finalizes the seed to only include appropriate task-runner files
    if (userResponse == "Gulp") {
        fs.unlinkSync('./Gruntfile.js');
        fs.rmdir('./Grunt');

    }
    else {
        fs.unlinkSync('./Gulpfile.js');
        fs.rmdir('./Gulp');
    }
    fs.unlinkSync('./initSeed.js');
});
