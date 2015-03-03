var gulp = require('gulp');
var runSeq = require('run-sequence');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var bower = require('gulp-bower');

gulp.task('heroku:production', function(){
  runSeq('bower', 'sass');
});

gulp.task('jshint', function() {
  return gulp.src(['**/*.js', '!node_modules/**/*.js', '!public/components/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('sass', function(done) {
  gulp.src('./public/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./public'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    })).on('end', done);
});

gulp.task('bower', function(done) {
	return bower();
});
