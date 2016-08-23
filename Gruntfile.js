module.exports = function(grunt){
    grunt.initConfig({
        watch:{
            jade:{
                files:['views/**'],
                options:{
                    livereload:true
                }
            },
            js:{
                files:['public/javascripts/**','models/**/*.js','schemas/**/*.js'],
        //        tasks:['jshint'],
                options:{
                    livereload:true
                }
            }
        },
        nodemon:{
            dev:{
                options:{
                    file:'app.js',
                    args:[],
                    ignoredFiles:['README.md','node_modules/**','DS_store'],
                    watchedExtensions:['js'],
                    watchedFolders:['./'],
                    debug:true,
                    delayTime:1,
                    env:{
                        PORT:3000
                    },
                    cwd:__dirname
                }
            }
        },
        concurrent:{
            tasks:['nodemon','watch'],
            options:{
                logConcurrentOutput:true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');  //只要有文件修改，增加删除，就会重新执行
    grunt.loadNpmTasks('grunt-nodemon');    //实时监听入口文件（app.js），入口文件出现改动，就会自动重启
    grunt.loadNpmTasks('grunt-concurrent'); //针对慢任务的插件，优化慢任务

    grunt.option('force',true);
    grunt.registerTask('default',['concurrent']);
}