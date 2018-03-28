/* eslint-disable strict */

'use strict';

const gulp = require('gulp');
const through = require('through2');
const newer = require('gulp-newer');
const babel = require('gulp-babel');
const ts = require('gulp-typescript');
const plumber = require('gulp-plumber');
const gutil = require('gulp-util');
const path = require('path');
const chalk = require('chalk');
const merge = require('merge2');
const less = require('gulp-less');
const watch = require('gulp-watch');
const batch = require('gulp-batch');

const src = './src/**/*.ts*';
const dest = 'dist';
const tsProject = ts.createProject('tsconfig.json');

const insert = require('gulp-insert');
const fs = require('fs');

let srcEx;
let assetsEx;
let libFragment;
let srcFragment;

if (path.win32 === path) {
	srcEx = /(packages\\node_modules\\[^/]+)\\src\\/;
	assetsEx = /(packages\\node_modules\\[^/]+)\\assets\\/;
	libFragment = '$1\\lib\\';
	srcFragment = '$1\\src\\';
} else {
	srcEx = new RegExp('(packages/node_modules/[^/]+)/src/');
	assetsEx = new RegExp('(packages/node_modules/[^/]+)/assets/');
	libFragment = '$1/lib/';
	srcFragment = '$1/src/';
}

function mapToDest(filepath) {
	return filepath.replace(srcEx, libFragment);
}

function mapSrcToDest(filepath) {
	return filepath.replace(assetsEx, srcFragment);
}

function fixErrorHandling() {
	return plumber({
		errorHandler: (err) => gutil.log(err.stack)
	});
}

function onlyNewFiles(map) {
	return newer({ map });
}

function logCompiling() {
	return through.obj((file, enc, callback) => {
		gutil.log('Compiling', `'${chalk.cyan(file.path)}'...`);
		callback(null, file);
	});
}

function renameUsingMapper(mapper) {
	return through.obj((file, enc, callback) => {
		file._path = file.path; // eslint-disable-line no-underscore-dangle, no-param-reassign
		file.path = mapper(file.path); // eslint-disable-line no-param-reassign

		callback(null, file);
	});
}
function buildLess() {
	return gulp
		.src('./src/datovelger/styles/datovelger.less')
		.pipe(less({}))
		.pipe(gulp.dest('./dist/datovelger/styles'));
}
function parseTsAndAppendDocInfo(contents, file) {
	const tsPath = file.path
		.replace(/\/lib\//g, '/src/')
		.replace(/.js$/g, '.tsx');

	let docInfo;
	let docInfoString;

	if (fs.existsSync(tsPath)) {
		docInfo = tsDocgen.parse(tsPath)[0];

		const exceptions = ['StatelessComponent', 'EventThrottler', 'Container'];

		if (exceptions.indexOf(docInfo.displayName) !== -1) {
			return contents;
		}

		if (
			docInfo.props.type &&
			docInfo.props.type.type &&
			docInfo.props.type.type.name &&
			docInfo.props.type.type.name.indexOf('|') !== -1
		) {
			docInfo.props.type.type.value = docInfo.props.type.type.name
				.split('|')
				.map((strValue) => ({ value: strValue.trim() }));
			docInfo.props.type.type.name = 'enum';
		}

		docInfoString = JSON.stringify(docInfo);

		// eslint-disable-next-line prefer-template
		return (
			contents + '\n' + docInfo.displayName + '.__docgenInfo = ' + docInfoString
		);
	}

	return contents;
}
function buildTs() {
	const tsResult = gulp
		.src(src)
		.pipe(fixErrorHandling())
		.pipe(onlyNewFiles(mapToDest))
		.pipe(logCompiling())
		.pipe(tsProject());

	const tsPipe = tsResult.js
		.pipe(babel({ plugins: ['transform-react-display-name'] }))
		.pipe(renameUsingMapper(mapToDest))
		.pipe(
			insert.transform((contents, file) =>
				parseTsAndAppendDocInfo(contents, file)
			)
		)
		.pipe(gulp.dest(dest));

	const dtsPipe = tsResult.dts
		.pipe(renameUsingMapper(mapToDest))
		.pipe(gulp.dest(dest));

	return merge([tsPipe, dtsPipe]);
}

function buildAndWatchLess() {
	watch(
		'./src/**/*.less',
		batch(function(events, done) {
			gulp.start('buildLess', done);
		})
	);
}

function buildAndWatchTs() {
	watch(
		['./src/**/*.tsx', './src/**/*.ts'],
		batch(function(events, done) {
			gulp.start('buildTs', done);
		})
	);
}

gulp.task('buildAndWatchLess', buildAndWatchLess);
gulp.task('buildAndWatchTs', buildAndWatchTs);
gulp.task('buildLess', buildLess);
gulp.task('buildTs', buildTs);
gulp.task('watch', buildAndWatchTs);
// gulp.task('dev', ['buildAndWatchLess', 'buildAndWatchTs']);

gulp.task('default', ['build']);
