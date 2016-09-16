const gulp = require('gulp');
const jshint = require('gulp-jshint');
const jscs = require('gulp-jscs');
const inject = require('gulp-inject'); // inject your own 
const wiredep = require('wiredep').stream;  // bower files
const nodemon = require('gulp-nodemon');

const jsFiles = ['*.js', 'src/**/*.js'];

gulp.task('style', function() {
    const jscsOptions = {
      configPath: './.jscsrc'  
    };
    
   return gulp.src(jsFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish', {
        verbose: true
    }))
    .pipe(jscs(jscsOptions));
});

gulp.task('inject', function() {
    
    const injectSrc = gulp.src(['./public/css/*.css', './public/js/*.js'], {read: false});
    
    const injectOptions = {
        ignorePath: '/public/'
    };

    const options = {
        bowerJson: require('./bower.json'),
        directory: './public/lib',
        ignorePath: '../../public'
    };
    
    return gulp.src('./src/views/*.ejs')
        .pipe(wiredep(options))
        .pipe(inject(injectSrc, injectOptions))
        .pipe(gulp.dest('./src/views'));
});

gulp.task('serve', ['style', 'inject'], function() {
    const serveOptions = {
        script: 'app.js',
        delayTime: 1,
        env: {
            'PORT': process.env.PORT
        },
        watch: jsFiles
    };
    
    return nodemon(serveOptions).on('restart', function(ev) {
        console.log('Restarting...');
    });
});