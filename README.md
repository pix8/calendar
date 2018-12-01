# Pogo Lib stack

Boilerplate tooling for the development and maintenance of libraries/Node.js modules.

Inspired by the excellent [React Modern Library Boilerplate](https://github.com/transitive-bullshit/react-modern-library-boilerplate) by Travis Fischer.

## Getting Started

**Warning here be dragons: I've literally just thrown this up if anybody was interested or it proved useful. It's not been groomed for public consumptions and I do not really have any plans to support it other than getting it in a coherent and tidy condition and then maintaing it for my needs. I would advise that this is not for general release until this message is removed.**

Primary initialisation
```javascript
git clone git@github.com:pix8/pogo-lib.git my-library
cd my-library
rm -rf .git
npm install
npm link
npm start
```

Secondary initialisation(examples directory)
```javascript
cd my-library/example.react or cd my-library/example.vue
npm install
npm link package-name
npm start
```
Note: both 'example' directories are just shells of their respective CLI derived host environments.
Note: Remember you must reassert the npm symbolic links whenever you run an npm install to circumvent the public NPM registry and enforce your locally developed module in it's place.

## Structure

* README.md
* .editorconfig
* .gitignore
* .circleci (*continuous integration)
* package.json
* Rollup(rollup.config)
	* Babel
		* ES6/React/Vue
		* HTML
			* Pug/JSX
		* CSS
			* PostCSS
			* SASS
		* SVG
		* Webfonts
		* Static resources: Bitmaps/text/audio/video
* Example/Sample
* .babelrc
* .eslintrc
* .postcssrc
* .storybook
* (API server(server.api.js)\
Mock/Services (stage: data-driven hydration/simulation)\
API(working directory)) *Optional stage
* Development
Source (stage: development/maintenance)\
Src(working directory)\
`npm start`
* Storybook (stage: review/validate/document)\
Stories(working directory)\
`npm run storybook`
* Test (stage: quality assurance/intregity)\
Test(working directory)\
`npm run test`
* Distribution (stage: release/deploy)\
Dist(working directory)\
`npm run deploy`
