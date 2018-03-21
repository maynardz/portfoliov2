/*  Gulp will be used for development and deployment tasks, 
such as minification of code, translating SCSS into SASS & CSS,
and reloading after a save.See the README.md for gulp commands.
*/
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var reload = browserSync.reload;
var filter = require('gulp-filter');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");

gulp.task('serve', function () {
    // Serve files from the root of the project
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("*.html").on("change", reload);
});

// Compiles SCSS files from /scss into /css
gulp.task('sass', function() {
    return gulp.src('scss/main.scss')
      .pipe(sass())     
      .pipe(gulp.dest('css'))
      .pipe(browserSync.reload({
        stream: true
      }))
  });

// Minifies js.
gulp.task('minify-js', function() {
    return gulp.src('js/main.js')
      .pipe(uglify())
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest('js'))
      .pipe(browserSync.reload({
        stream: true
      }))
  });

  //Runs all appropriate tasks and watches for changes. 
gulp.task('dev', ['serve', 'sass', 'minify-js'], function() {
    gulp.watch('scss/*.scss', ['sass']);
    gulp.watch('*.html');
    gulp.watch('js/*.js', ['minify-js']);
    gulp.watch('*.html', reload);
    gulp.watch('js/**/*.js', reload);
  });

  // This copies our third party libraries from /node_modules into /tools folder
gulp.task('tools', function() {

  // Bootstrap
  gulp.src([
      './node_modules/bootstrap/dist/**/*'
    ])
    .pipe(gulp.dest('./tools/bootstrap'))

  // Font Awesome
  gulp.src([
      './node_modules/font-awesome/**/*',
      '!./node_modules/font-awesome/{less,less/*}',
      '!./node_modules/font-awesome/{scss,scss/*}',
      '!./node_modules/font-awesome/.*',
      '!./node_modules/font-awesome/*.{txt,json,md}'
    ])
    .pipe(gulp.dest('./tools/font-awesome'))

  // jQuery
  gulp.src([
      './node_modules/jquery/dist/*',
      '!./node_modules/jquery/dist/core.js'
    ])
    .pipe(gulp.dest('./tools/jquery'))

  // jQuery Easing
  gulp.src([
      './node_modules/jquery.easing/*.js'
    ])
    .pipe(gulp.dest('./tools/jquery-easing'))

  // Animate
  gulp.src([
    './node_modules/animate.css/animate.min.css'
  ])
  .pipe(gulp.dest('./tools/animate.css'))

  // Wowjs
  gulp.src([
    './node_modules/wowjs/dist/*'
  ])
  .pipe(gulp.dest('./tools/wowjs'))

  // Magnific Popup
  gulp.src([
    './node_modules/magnific-popup/dist/*'
  ])
  .pipe(gulp.dest('./tools/magnific-popup'))

});
