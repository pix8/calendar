import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
//import postcss from 'rollup-plugin-postcss'

import resolve from 'rollup-plugin-node-resolve'
import alias from 'rollup-plugin-alias'
import paths from 'rollup-plugin-includepaths';

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
    }
  },
  external: [
    'react',
    'react-dom',
    'prop-types'
  ],
  globals:{
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
      plugins: ['transform-runtime'],
      runtimeHelpers: true,
      externalHelpers: false
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
