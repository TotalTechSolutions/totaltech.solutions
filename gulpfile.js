/*
|--------------------------------------------------------------------------
| Dependencies
|--------------------------------------------------------------------------
*/

var gulp   = require('gulp');
var less   = require('gulp-less');
var concat = require('gulp-concat');
var minify = require('gulp-minify-css');
var uglify = require('gulp-uglify');

var LessPluginCleanCSS = require('less-plugin-clean-css'),
    LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    cleancss = new LessPluginCleanCSS({ advanced: true }),
    autoprefix= new LessPluginAutoPrefix({ browsers: ["last 2 versions"] });

/*
|--------------------------------------------------------------------------
| Less
|--------------------------------------------------------------------------
*/

gulp.task('less', function() {
    return gulp.src('resources/less/main.less')
        .pipe(less({
            plugins: [autoprefix, cleancss]
        }))
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('public/css/'));
});

/*
|--------------------------------------------------------------------------
| JavaScript
|--------------------------------------------------------------------------
*/

gulp.task('js', function() {
    return gulp.src([
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/bootstrap/dist/js/bootstrap.min.js',
        ])
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js/'));
});

/*
|--------------------------------------------------------------------------
| Watch Task
|--------------------------------------------------------------------------
*/

gulp.task('watch', function() {
    gulp.watch('resources/less/**/*.less', ['less']);
});


/*
|--------------------------------------------------------------------------
| Default Task
|--------------------------------------------------------------------------
*/

gulp.task('default', ['less', 'js']);

