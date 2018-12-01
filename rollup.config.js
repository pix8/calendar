import resolve from 'rollup-plugin-node-resolve'
import alias from 'rollup-plugin-alias'
import paths from 'rollup-plugin-includepaths';
import vue from 'rollup-plugin-vue'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'


import pkg from './package.json'

export default {
	input: 'src/index.js',
	
	output: [
		{
			file: pkg.main,
			format: 'cjs'
		},
		{
			file: pkg.module,
			format: 'es'
		}
	],

	watch:{
		chokidar: {
			paths: 'src/**'
		},
		exclude: 'node_modules/**'
	},

	//treat as external dependencies and do not bundled with module
	external: [
		'react',
		'react-dom',
		'prop-types',
		'styled-components',
		'vue'
	],

	plugins: [
		vue(),
		babel({
			exclude: 'node_modules/**',
			runtimeHelpers: true,
			externalHelpers: true
		}),
		commonjs(),
		json(),
		paths({
			paths: ['src'],
			external: [],
			extensions: ['.js', '.jsx']
		}),
		alias({
			resolve: ['.jsx', '.js'],
			components: './src/components'
		}),
		resolve()
	]
}
