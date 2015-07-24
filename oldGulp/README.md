## The `gulp` Directory

In an attempt to make gulp tasks more readable, we have organized all gulp tasks
into six files (and the core `Gulpfile.js`) based on their respective targets and goals,

```
  |-Gulpfile.js
  |-Gulp/
  | |-assetTasks.js
  | |-coreTasks.js
  | |-generalTasks.js
  | |-scriptTasks.js
  | |-testTasks.js
  | |-watchTasks.js
```

The core gulp file, `Gulpfile.js` will act as the gulp factory, providing the
configuration object to be used throughout the gulp process, and calling each task script from the
Gulp folder. This Gulp configuration object is solely setup to provide gulp with the correct folder/file
targets for every `gulp` instance. Adjust this configuration setup at your own risk!!!

`assetTasks.js` and `scriptTasks.js` contain the core build and compile operations for all assets
(css, images, fonts, etc.) and js files, such as copying application files from `/src` to `/build`,
bower dependencies from `/vendor` to `/build`, and all general compile functions from `/build` to
`/compile`. The rule of thumb for tasks that fall within these scripts is, 'if it outputs this file
type and only this file type, it's in this script'.

`generalTasks.js` is more broadly defined in terms of its included tasks. Tasks within this script
include such things as cleaning the `/build` and/or `/compile` directories prior to every new `gulp`
instance, and injecting the correct filepaths into the `index.html` file. Any non-asset/js
task that is supporting the build or compile process should go in here.

`watchTasks.js` contains all tasks that will dynamically reload content or your server based on any
changes made to a set of specified files. We use [Browser-sync](https://github.com/Browsersync/browser-sync),
but you could just as easily rebuild the watch tasks to work with Livereload or 