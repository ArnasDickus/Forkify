# Forkify

Forkify created with the help of udemy "The Complete JavaScript Course 2018: Build Real Projects!".

Live version will be available as soon as a project is finished

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
Node.js from Node.js website. For npm packages.
```

### Installing

A step by step series of examples that tell you how to get a development env running

Open command prompt in project root folder and type:

```
npm install
```
Install gulp globally
```
npm install --global gulp-cli
```

To deploy server for editing with gulp enabled:
```
gulp watch
```
## Icons

IMPORTANT all svg files must be placed in app\assets\images\icons folder.
To combine all svg files into one write:

```
gulp icons
```

Combines icons files appear at:

```
app\assets\images\sprites\sprite-e79e95cc.svg
```
Please note there is also a backup png sprites to support older browsers.
To use your icon in the project:

add class into div from:
```
app\assets\styles\modules\_sprite.css
```
Example For a facebook icon.
```
 <div class = "icon icon--facebook"></div>
```
## Deployment

To deploy on live system you need to bundle all files together. You can do this in git bash writing:

```
gulp build
```
To preview your build project write in git bash

```
gulp previewdist
```
## Changing deployed folder name from docs to your choosing.

Sometimes you need to change your distribution folder name, to change it,
modify these lines name "docs" to name you want to have.

gulp\tasks\build.js
```
14 line (baseDir: "docs"),
20 line (return del('./docs')),
36 line (.pipe(gulp.dest("./docs"));)
48 line .pipe(gulp.dest('./docs/assets/images'));
61 line .pipe(gulp.dest("./docs"));
```

## Built With

* [BABEL](https://github.com/babel/babel) - For writing modern javascript.
* [WEBPACK](https://github.com/webpack/webpack) - For bundling javascript files.
* [JQUERY](https://github.com/jquery/jquery) - Javascript library.
* [POSTCSS](https://github.com/postcss/postcss) - For styling files.
* [GULP](https://github.com/gulpjs/gulp) - For automating browser.

## Authors

* **Arnas Dickus**

## Acknowledgments

* Thanks to Jonas Schmedtmann for The Complete JavaScript Course 2018: Build Real Projects!.
