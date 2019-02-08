var gulp = require('gulp');

// Requires the gulp-sass plugin
var sass = require('gulp-sass');


// compile sass.
gulp.task('sass', function(){
    return gulp.src('assets/css/style.scss')
      .pipe(sass()) // Converts Sass to CSS with gulp-sass
      .pipe(gulp.dest('assets/css') );
  });

  // Gulp watch syntax.
gulp.task('watch', function(){
    gulp.watch('assets/css/**/*.scss', gulp.series('sass'));
    // Other watchers
})