var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var $    = require('gulp-load-plugins')();

var sassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

gulp.task('sass', function() {
  return gulp.src('./scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "dev.abc.dev"
    });
    gulp.watch("scss/*.scss", ['sass']);
    gulp.watch("**/**.html").on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync']);
