/* eslint-disable */

import Vue from 'vue'

import * as UI from '@pix8/ui-vue'
import { Tab as UiTab } from '@pix8/ui-vue'
import { Collapsible as UiCollapsible } from '@pix8/ui-vue'

//DEVNOTE: nice little snippet to globally register all module exports from a nominated directory as vue components
//https://vuejs.org/v2/guide/components-registration.html#Automatic-Global-Registration-of-Base-Components
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

/*const requireComponent = require.context(
	// The relative path of the components folder
	'./components',
	// Whether or not to look in subfolders
	false,
	// The regular expression used to match base component filenames
	/Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
	// Get component config
	const componentConfig = requireComponent(fileName)

	// Get PascalCase name of component
	const componentName = upperFirst(
		camelCase(
			// Strip the leading `./` and extension from the filename
			fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
		)
	)

	// Register component globally
	Vue.component(
	componentName,
		// Look for the component options on `.default`, which will
		// exist if the component was exported with `export default`,
		// otherwise fall back to module's root.
		componentConfig.default || componentConfig
	)
})*/

//DEVNOTE: Vue.extend() might be a nicer way to define these components
//https://vuejs.org/v2/api/#Vue-extend

//reference/explore/investigate
//https://vuejs.org/v2/api/#Options-Data --see notes
//https://vuejs.org/v2/api/#template -- look at # in template i.e template: # i.e. in DOM template can this not be used reciporcally? to reference itself like a crude slot
//https://vuejs.org/v2/api/#render -- functional components? + context?
//https://vuejs.org/v2/api/#provide-inject -- mentions react's context feature which something i had to hook into for react
//https://vuejs.org/v2/api/#functional
//https://vuejs.org/v2/api/#vm-slots -- render function alternative? look at the see also links
//https://vuejs.org/v2/api/#Vue-component -- see usage examples
//https://vuejs.org/v2/api/#Vue-compile -- might be useful if i were to cloneNodes or intervene via this.$el on mount hook
//https://vuejs.org/v2/api/#vm-mount -- for reading/reference


Vue.config.productionTip = false

//global registration (register components before instantiating a root instance)
//DEVNOTE: to globally register components they must be declared before the instantiation of a root Vue instance(new Vues) to be adopted
//DEVNOTE: not ideal to declare globally as these may get bundled regardless of whether they are used or not
//Vue.component('UiCarousel', UI.Carousel);
//Vue.component('UiCollapsible', UI.Collapsible)
//Vue.component('UiAccordion', UI.Accordion)
//Vue.component('UiTab', UI.Tab)
//Vue.component('UiPane', UI.Pane)

//local registration
//#app
// new Vue({
// 	render: createElement => createElement(App) //render: function(createElement) { return createElement(App); }
// }).$mount('#app')




let test = document.querySelectorAll('ui-carousel');

if(test != undefined || null && test.length) {
	test.forEach((el, i, collection) => {
		new Vue(UI.Carousel).$mount(el);
	})
}


test = document.querySelectorAll('[ui-collapsible]');

if(test != undefined || null && test.length) {
	test.forEach((el, i, collection) => {
		new Vue(UI.Collapsible).$mount(el);
	})
}


test = document.querySelectorAll('[ui-accordion]');

if(test != undefined || null && test.length) {
	test.forEach((el, i, collection) => {
		new Vue(UI.Accordion).$mount(el);
	})
}


//DEVNOTE: 'name' option is only respected when used as a component option not on root; this is why custom elements don't get recognised on root component
// test = document.querySelectorAll('[ui-tab]');

// if(test != undefined || null && test.length) {
// 	test.forEach((el, i, collection) => {
// 		new Vue(UI.Tab);
// 	})
// }

test = document.querySelectorAll('[ui-component]');

if(test != undefined || null && test.length) {
	test.forEach((el, i, collection) => {
		new Vue({
			el: el,
			//name: 'UiComponent',
			components: { UiTab, 'UiPane': UI.Pane }
		});
	})
}

// if(test != undefined || null && test.length) {
// 	test.forEach((el, i, collection) => {
// 		new Vue({
// 			render: (createElement) => createElement('ui-component', {el: el, components: { UiTab, 'UiPane': UI.Pane }})
// 		}).$mount(el)
// 	})
// }
