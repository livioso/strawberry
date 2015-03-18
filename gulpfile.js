var gulp = require('gulp');
var runSeq = require('run-sequence');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var bower = require('gulp-bower');

gulp.task('heroku:production', function(){
  'use strict';
  runSeq('bower', 'sass');
});

gulp.task('jshint', function() {
  'use strict';
  return gulp.src(
    ['**/*.js','!node_modules/**/*.js','!public/components/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('sass', function(done) {
  'use strict';
  gulp.src('./public/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./public'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    })).on('end', done);
});

gulp.task('bower', function() {
  'use strict';
	return bower();
});
