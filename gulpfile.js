var gulp = require('gulp');
var sass = require('gulp-sass');
 
gulp.task('sass', function(){

  return gulp.src('src/assets/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('src/app/'))
});

var exec = require('child_process').exec;

gulp.task('serve', function (cb) {
	var port= Math.floor(Math.random()*9999+1001);
  exec('ng serve --port '+port, function (err, stdout, stderr) {

    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
	console.log('Executing on port',port);
})

gulp.task('watch', ['sass'], function (){

  gulp.watch('src/assets/scss/**/*.scss', ['sass']); 
  
 
});

gulp.task('default', ['sass', 'watch'], function (){


});
