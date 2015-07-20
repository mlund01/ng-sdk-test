var fs = require('fs');
var path = require('path');

function CustomRequire(dir) {
    var ceo = this;
    ceo.dir = dir;
    ceo.findProjectRoot = function () {
        var newDir = function (dir) {
            var dirSplit = dir.split(path.sep);
            dirSplit.splice(-1, 1);
            var output = "";
            dirSplit.forEach(function (item) {
                if (item == dirSplit.slice(-1)) {
                    output += item;
                } else {
                    output += item + path.sep
                }
            });
            return output;
        };

        var findRoot = function (dir) {
            var found = false;
            fs.readdirSync(dir).forEach(
                function (name) {
                    if (name == "package.json") {
                        found = true;
                    }
                }
            );
            return found;
        };


        var rootDir = ceo.dir;
        var found = findRoot(rootDir);

        while (found === false) {
            rootDir = newDir(rootDir);
            found = findRoot(rootDir);
        }
        return rootDir

    };
    ceo.customRequire = function (target) {
        var basePath = ceo.findProjectRoot();

        function walk(curDirPath) {
            fs.readdirSync(curDirPath).forEach(
                function (name) {
                    var filePath = path.join(curDirPath, name);
                    var stat = fs.statSync(filePath);
                    if (stat.isFile()) {
                        require(filePath);
                    } else {
                        walk(filePath)
                    }
                })

        }
    };


    var findProjectRoot = function (dir) {
        var newDir = function (dir) {
            var dirSplit = dir.split(path.sep);
            dirSplit.splice(-1, 1);
            var output = "";
            dirSplit.forEach(function (item) {
                if (item == dirSplit.slice(-1)) {
                    output += item;
                } else {
                    output += item + path.sep
                }
            });
            return output;
        };

        var findRoot = function (dir) {
            var found = false;
            fs.readdirSync(dir).forEach(
                function (name) {
                    if (name == "package.json") {
                        found = true;
                    }
                }
            );
            return found;
        };


        var rootDir = dir;
        var found = findRoot(rootDir);

        while (found === false) {
            rootDir = newDir(rootDir);
            found = findRoot(rootDir);
        }
        return rootDir

    };

    findPackage = function (pkg) {

    };

    module.exports = {
        findProjectRoot: findProjectRoot,
        findRelativePath: findRelativePath
    }
}