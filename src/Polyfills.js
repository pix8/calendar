
/* Array.isArray
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
*************************/
if(!Array.isArray) {
	Array.isArray = arg => Object.prototype.toString.call(arg) === '[object Array]';
}
