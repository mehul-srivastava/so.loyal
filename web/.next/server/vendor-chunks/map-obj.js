"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/map-obj";
exports.ids = ["vendor-chunks/map-obj"];
exports.modules = {

/***/ "(rsc)/./node_modules/map-obj/index.js":
/*!***************************************!*\
  !*** ./node_modules/map-obj/index.js ***!
  \***************************************/
/***/ ((module) => {

eval("\n\nconst isObject = value => typeof value === 'object' && value !== null;\nconst mapObjectSkip = Symbol('skip');\n\n// Customized for this use-case\nconst isObjectCustom = value =>\n\tisObject(value) &&\n\t!(value instanceof RegExp) &&\n\t!(value instanceof Error) &&\n\t!(value instanceof Date);\n\nconst mapObject = (object, mapper, options, isSeen = new WeakMap()) => {\n\toptions = {\n\t\tdeep: false,\n\t\ttarget: {},\n\t\t...options\n\t};\n\n\tif (isSeen.has(object)) {\n\t\treturn isSeen.get(object);\n\t}\n\n\tisSeen.set(object, options.target);\n\n\tconst {target} = options;\n\tdelete options.target;\n\n\tconst mapArray = array => array.map(element => isObjectCustom(element) ? mapObject(element, mapper, options, isSeen) : element);\n\tif (Array.isArray(object)) {\n\t\treturn mapArray(object);\n\t}\n\n\tfor (const [key, value] of Object.entries(object)) {\n\t\tconst mapResult = mapper(key, value, object);\n\n\t\tif (mapResult === mapObjectSkip) {\n\t\t\tcontinue;\n\t\t}\n\n\t\tlet [newKey, newValue, {shouldRecurse = true} = {}] = mapResult;\n\n\t\t// Drop `__proto__` keys.\n\t\tif (newKey === '__proto__') {\n\t\t\tcontinue;\n\t\t}\n\n\t\tif (options.deep && shouldRecurse && isObjectCustom(newValue)) {\n\t\t\tnewValue = Array.isArray(newValue) ?\n\t\t\t\tmapArray(newValue) :\n\t\t\t\tmapObject(newValue, mapper, options, isSeen);\n\t\t}\n\n\t\ttarget[newKey] = newValue;\n\t}\n\n\treturn target;\n};\n\nmodule.exports = (object, mapper, options) => {\n\tif (!isObject(object)) {\n\t\tthrow new TypeError(`Expected an object, got \\`${object}\\` (${typeof object})`);\n\t}\n\n\treturn mapObject(object, mapper, options);\n};\n\nmodule.exports.mapObjectSkip = mapObjectSkip;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbWFwLW9iai9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBYTs7QUFFYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsUUFBUSxRQUFRO0FBQ2hCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDBCQUEwQixzQkFBc0IsSUFBSTs7QUFFcEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1EQUFtRCxPQUFPLE1BQU0sY0FBYztBQUM5RTs7QUFFQTtBQUNBOztBQUVBLDRCQUE0QiIsInNvdXJjZXMiOlsid2VicGFjazovL3NvbG95YWwvLi9ub2RlX21vZHVsZXMvbWFwLW9iai9pbmRleC5qcz9hYTkxIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgaXNPYmplY3QgPSB2YWx1ZSA9PiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICE9PSBudWxsO1xuY29uc3QgbWFwT2JqZWN0U2tpcCA9IFN5bWJvbCgnc2tpcCcpO1xuXG4vLyBDdXN0b21pemVkIGZvciB0aGlzIHVzZS1jYXNlXG5jb25zdCBpc09iamVjdEN1c3RvbSA9IHZhbHVlID0+XG5cdGlzT2JqZWN0KHZhbHVlKSAmJlxuXHQhKHZhbHVlIGluc3RhbmNlb2YgUmVnRXhwKSAmJlxuXHQhKHZhbHVlIGluc3RhbmNlb2YgRXJyb3IpICYmXG5cdCEodmFsdWUgaW5zdGFuY2VvZiBEYXRlKTtcblxuY29uc3QgbWFwT2JqZWN0ID0gKG9iamVjdCwgbWFwcGVyLCBvcHRpb25zLCBpc1NlZW4gPSBuZXcgV2Vha01hcCgpKSA9PiB7XG5cdG9wdGlvbnMgPSB7XG5cdFx0ZGVlcDogZmFsc2UsXG5cdFx0dGFyZ2V0OiB7fSxcblx0XHQuLi5vcHRpb25zXG5cdH07XG5cblx0aWYgKGlzU2Vlbi5oYXMob2JqZWN0KSkge1xuXHRcdHJldHVybiBpc1NlZW4uZ2V0KG9iamVjdCk7XG5cdH1cblxuXHRpc1NlZW4uc2V0KG9iamVjdCwgb3B0aW9ucy50YXJnZXQpO1xuXG5cdGNvbnN0IHt0YXJnZXR9ID0gb3B0aW9ucztcblx0ZGVsZXRlIG9wdGlvbnMudGFyZ2V0O1xuXG5cdGNvbnN0IG1hcEFycmF5ID0gYXJyYXkgPT4gYXJyYXkubWFwKGVsZW1lbnQgPT4gaXNPYmplY3RDdXN0b20oZWxlbWVudCkgPyBtYXBPYmplY3QoZWxlbWVudCwgbWFwcGVyLCBvcHRpb25zLCBpc1NlZW4pIDogZWxlbWVudCk7XG5cdGlmIChBcnJheS5pc0FycmF5KG9iamVjdCkpIHtcblx0XHRyZXR1cm4gbWFwQXJyYXkob2JqZWN0KTtcblx0fVxuXG5cdGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKG9iamVjdCkpIHtcblx0XHRjb25zdCBtYXBSZXN1bHQgPSBtYXBwZXIoa2V5LCB2YWx1ZSwgb2JqZWN0KTtcblxuXHRcdGlmIChtYXBSZXN1bHQgPT09IG1hcE9iamVjdFNraXApIHtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdGxldCBbbmV3S2V5LCBuZXdWYWx1ZSwge3Nob3VsZFJlY3Vyc2UgPSB0cnVlfSA9IHt9XSA9IG1hcFJlc3VsdDtcblxuXHRcdC8vIERyb3AgYF9fcHJvdG9fX2Aga2V5cy5cblx0XHRpZiAobmV3S2V5ID09PSAnX19wcm90b19fJykge1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0aWYgKG9wdGlvbnMuZGVlcCAmJiBzaG91bGRSZWN1cnNlICYmIGlzT2JqZWN0Q3VzdG9tKG5ld1ZhbHVlKSkge1xuXHRcdFx0bmV3VmFsdWUgPSBBcnJheS5pc0FycmF5KG5ld1ZhbHVlKSA/XG5cdFx0XHRcdG1hcEFycmF5KG5ld1ZhbHVlKSA6XG5cdFx0XHRcdG1hcE9iamVjdChuZXdWYWx1ZSwgbWFwcGVyLCBvcHRpb25zLCBpc1NlZW4pO1xuXHRcdH1cblxuXHRcdHRhcmdldFtuZXdLZXldID0gbmV3VmFsdWU7XG5cdH1cblxuXHRyZXR1cm4gdGFyZ2V0O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSAob2JqZWN0LCBtYXBwZXIsIG9wdGlvbnMpID0+IHtcblx0aWYgKCFpc09iamVjdChvYmplY3QpKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgRXhwZWN0ZWQgYW4gb2JqZWN0LCBnb3QgXFxgJHtvYmplY3R9XFxgICgke3R5cGVvZiBvYmplY3R9KWApO1xuXHR9XG5cblx0cmV0dXJuIG1hcE9iamVjdChvYmplY3QsIG1hcHBlciwgb3B0aW9ucyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5tYXBPYmplY3RTa2lwID0gbWFwT2JqZWN0U2tpcDtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/map-obj/index.js\n");

/***/ })

};
;