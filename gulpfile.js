var gulp = require('gulp');
var runSeq = require('run-sequence');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

gulp.task('heroku:production', function(){
  // runSeq('clean', 'build', 'minify');
});

gulp.task('jshint', function() {
  return gulp.src(['**/*.js', '!node_modules/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});
