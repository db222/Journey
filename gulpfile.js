var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');

var rename = require('gulp-rename');
var minifyCss = require('gulp-minify-css');
var clean = require('gulp-clean');


var path = {
  HTML: 'client/index.html',
  MINIFIED_OUT: 'build.min.js',
  OUT: 'build.js',
  DEST: 'dist',
  DEST_BUILD: 'dist/build',
  DEST_SRC: 'dist/src',
  ENTRY_POINT: 'client/components/HomeViewComponent.jsx'
};

//copy the index.html file to the distribute folder
gulp.task('copy', function() {
    gulp.src(path.HTML)
        .pipe(gulp.dest(path.DEST));
});

gulp.task('watch', function() {
    gulp.watch(path.HTML, ['copy']);

    var watcher = watchify(browserify({
        entries: [path.ENTRY_POINT],
        transform: [reactify],
        debug: true,
        cache: {}, packageCache: {}, fullPaths:true
    }))

    return watcher.on('update', function() {
        watcher.bundle()
            .pipe(source(path.OUT))
            .pipe(gulp.dest(path.DEST_SRC))
            console.log('updated')
    })
        .bundle()
        .pipe(source(path.OUT))
        .pipe(gulp.dest(path.DEST_SRC))
});

gulp.task('buildClient', function(){
    browserify({
        entries: [path.ENTRY_POINT],
        transform: [reactify]
    })
        .bundle()
        .pipe(source(path.MINIFIED_OUT))
        .pipe(streamify(uglify(path.MINIFIED_OUT)))
        .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('replaceHTML', function() {
    gulp.src(path.HTML)
        .pipe(htmlreplace({
            'js': 'build/' + path.MINIFIED_OUT
        }))
        .pipe(gulp.dest(path.DEST))
});

gulp.task('production', ['replaceHTML', 'buildClient'])
gulp.task('default', ['watch']);


// gulp.task('lint', function() {
//     return gulp.src([targetClientSourceFiles, '!' + distributeSource])
//         .pipe(jshint())
//         .pipe(jshint.reporter('jshint-stylish'))
//         .pipe(jshint.reporter('fail'));
// });

// gulp.task('compressAndConcat', ['lint'], function() {
//     return gulp.src(targetClientSourceFiles)
//         .pipe(concat('all.js'))
//         .pipe(gulp.dest(distributeDirectory))
//         .pipe(rename('all.min.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest(distributeDirectory));
// });

// gulp.task('minify-css', function() {
//     return gulp.src('styles/*.css')
//         .pipe(minifyCss())
//         .pipe(rename('style.min.css'))
//         .pipe(gulp.dest(distributeDirectory));
// });

// gulp.task('clean', function() {
//     return gulp.src(distributeDirectory)
//         .pipe(clean());
// });

//gulp.task('build', ['lint', 'compressAndConcat', 'minify-css']);

