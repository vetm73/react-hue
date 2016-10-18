import fs from 'fs'
import gulp from 'gulp'
import gutil from 'gulp-util'
// import svgstore from 'gulp-svgstore'
// import svgmin from 'gulp-svgmin'
// import inject from 'gulp-inject'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'

// the 'output' parameter is defined in pom.xml
const target = gutil.env.output || 'target/build'
const port = 3000

gulp.task('watch:js',
    (callback) => {
        const config = require('./webpack.config')
        const server = new WebpackDevServer(webpack(config), {
            // headers: { 'Content-Security-Policy': 'default-src \'self\'; img-src \'self\';script-src \'self\'; style-src \'self\' \'unsafe-inline\';font-src \'self\' data:; connect-src \'self\' ws://localhost:3000;' },
            hot: true,
            publicPath: config.output.publicPath,
            stats: {
                colors: true,
                chunks: false
            },
            // proxy: {
            //     // '/target/build/app.css': '',
            //     '/api/*': {
            //         target: 'http://localhost:8080',
            //         rewrite: function(req) {
            //             req.url = req.url.replace(/^\/api/, '');
            //         }
            //     },
            //     '/pdf/*': {
            //         target: 'http://www.seventythree.cc',
            //         rewrite: function(req) {
            //             req.url = req.url.replace(/^\/pdf/, '');
            //         }
            //     }
            // }
        })
        server.listen(port, '0.0.0.0', (err) => {
            if (err) {
                throw gutil.PluginError( 'watch:webpack', err )
            }
            gutil.log('listening on http://localhost:3000')
            callback()
        })
    }
)

gulp.task('watch:index', ['index'],
    () => gulp.watch([ 'web/resources/index.html' ], [ 'index' ])
)

gulp.task('watch', [ 'watch:index', 'watch:js' ])

gulp.task('webpack',
    (callback) => {
        const config = require('./webpack.config.production')
        config.output.path = target
        webpack(config, (err, stats) => {
            if (err) {
                throw new gutil.PluginError('webpack', err)
            }
            gutil.log(stats.toString({ chunks: false }))
            fs.writeFile(`${target}/../stats.json`, JSON.stringify(stats.toJson()), (errors) => {
                if(errors) {
                    return gutil.log('failed to write "stats.json"')
                }
                gutil.log('Wrote "stats.json". Analyse it at "http://webpack.github.io/analyse/"')
            })
            callback()
        })
    }
)

gulp.task('index',
    () => {
        // const icons = gulp
        //     .src(['web/resources/icons/*.svg','web/resources/logos/*.svg'])
        //     .pipe(svgmin())
        //     .pipe(svgstore({ inlineSvg: true }))
        return gulp.src('web/resources/index.html')
            // .pipe(inject(icons, {
            //     transform: (path, file) => file.contents.toString()
            // }))
            .pipe(gulp.dest(target))
    }
)

gulp.task('copypdf', () => {
    gulp.src('web/resources/test_data/*.pdf')
      .pipe(gulp.dest(target));
});

gulp.task('default', [ 'index', 'webpack', 'copypdf' ])
