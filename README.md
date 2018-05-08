# Introduction

This repository is intended to hold a project shell for creating applications written in vue, compiled with webpack, which also generates a service worker for the application allowing for offline functionality as well as any other service worker logic you wish.  The project uses the `workbox-webpack-plugin` to generate the service worker and allows for the use of the premade modules workbox provides.

# How Do You Use It?

* First run the update command to update npm to the latest version and install all the dependencies for the application.
	>Be aware that this updates the global npm install, while the dependencies are downloaded into the local node_modules.
```
npm run-script update
```

* Next, you can build your application with the build script, which will generate the appliation files into a `dist` directory.
```
npm run-script build
```

* Finally, you can use a basic http server to test your application.  I would suggest starting it in a terminal on it's own as it will be an on going process, which can be terminated by closing the terminal or hitting `Ctrl+C`.
```
npm run-script server
```

All of these scripts can be found in the `package.json` for potential modification.

## Other scripts

* Build the application and rebuild again any time a change is detected within the source files.
```
npm run-script build-watch
```

* Build the application for production
	>A watch version of the production build is not included as I will be watching my development build and once I am happy with a build I will make a production version of it, however this could always be added to the `package.json`
```
npm run-script build-production
```

# Webpack Details

* The `entry` can be changed to be whatever javascript file is the entry file for your vue application.
* The `htmlPlugin` creates an index.html for the application.  If this works for you, simply change the `title` for your application.
	* There are two examples of the htmlPlugin in the configuration.  The first creates an entire html file from scratch.  The second takes an html template you give it and it injects the values into it, giving you more control over the contents of this generated page.  To inject a value into the html, such as the title, you can use the following pattern:
		> &lt;title><%= htmlWebpackPlugin.options.title %>&lt;/title>
	* The second method can be useful if you want to include a `manifest.json` in your index page.
* The `copyPlugin` is used to easily copy source files into the generated `dist` directory that otherwise would be ignored by webpack.  If you do not need this, it can be removed.
* The `workboxPlugin.InjectManifest` and `workboxPlugin.GenerateSW` plugins are used to create the service worker for the application.  If you only need to use some of the premade workbox modules then remove the `InjectManifest` and configure your service worker with `GenerateSW`.  If you need custom logic for your application, or more granular control over the service worker, instead remove the `GenerateSW` and configure the `InjectManifest` to know where your service worker file is and where it should be placed.  The `InjectManifest` will inject into your service worker script the inclusion of the workbox script as well as the precache files by default.

# Final Thoughts (for now)

This repository is a continuation of the `gulp-webpack-vue` repository.  It has removed gulp in exchange for using npm scripts.  At this point I prefer this method now as the ability of npm to `--watch` things appears to work with new files where with gulp I had to stop the process and start the watch again any time I created a new file.  With the npm script I only need to do this if I make a change to something outside of my source directory.  So an improvement, ^_^