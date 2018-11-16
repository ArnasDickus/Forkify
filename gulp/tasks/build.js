var gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
del = require('del'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
cssnano = require('gulp-cssnano'),
uglify = require('gulp-uglify'),
browserSync = require('browser-sync').create(),
strip = require('gulp-strip-comments'),
htmlmin = require('gulp-htmlmin');


gulp.task('minify', function(){
  return gulp.src('app/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('docs'));
});

// delete comments
gulp.task('delete-comments', function(){
  let filesToDeleteComments = [
    'docs/index.html',
    'docs/scripts/**',
    'docs/styles/**',

  ]
  return gulp.src(filesToDeleteComments)
  .pipe(strip())
  .pipe(gulp.dest('docs'));
});

// Preview Distribution folder files.
gulp.task('previewDist', function(){
  browserSync.init({
    notify: false,
    server: {
      baseDir: "docs"
    }
  });
});

// Deleting dist folder. So that files be new.
gulp.task('deleteDistFolder',['icons'], function(){
  return del('./docs')
});

// Copy all general files like wordpress, or others. unknown to the project.
gulp.task('copyGeneralFiles', ['deleteDistFolder'], function(){
  var pathsToCopy = [
    './app/**/*',
    '!./app/index.html',
    '!./app/assets/images/**',
    '!./app/assets/styles/**',
    '!./app/assets/scripts/**',
    '!./app/temp',
    '!./app/temp/**'
  ];

  return gulp.src(pathsToCopy)
    .pipe(gulp.dest("./docs"));
});

// gulp-imagemin. Compress images
// https://github.com/sindresorhus/gulp-imagemin
gulp.task('optimizeImages',['deleteDistFolder',], function(){
  return gulp.src(['./app/assets/images/**/*',
   '!./app/assets/images/icons',
   '!./app/assets/images/icons/**/*'])
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      multipass: true
    }))
    .pipe(gulp.dest('./docs/assets/images'));
});
// TODO gulp usemin is depreacated need to use browserify or webpack
  gulp.task('useminTrigger' , ['deleteDistFolder',], function(){
    gulp.start("usemin");
  });

gulp.task('usemin', ['styles', 'scripts'], function(){
  return gulp.src("./app/index.html")

    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(usemin({
      css: [function() {return rev()}, function() {return cssnano()}],
      js: [function() {return rev()}, function() {return uglify()}]
    }))
    .pipe(gulp.dest("./docs"));
});


gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles','optimizeImages', 'useminTrigger',]);
