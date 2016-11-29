const sourceFiles = [
    'src/module.js',
    'src/name-service.js',
    'src/order-service.js',
    'src/data-service.js',
    'src/helpers.js',
    'src/directive.js',
];

module.exports = function (grunt) {

    grunt.initConfig({
        watch: {
            files: ['tests/*.js'].concat(sourceFiles),
            tasks: ['concat:dist', 'run:test']
        },
        concat: {
            options: {
                sourceMap: true,
            },
            dist: {
                src: sourceFiles,
                dest: 'dist/crunch-kata.js',
            },
        },
        run: {
            test: {
                cmd: 'npm',
                args: ['test']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-run');

    grunt.registerTask('default', ['concat']);
    grunt.registerTask('dev', ['concat', 'run:test', 'watch']);

};
