// Copyright 2013 Google Inc.
// Copyright 2014 Volker Sorge
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview A collection of JavaScript utilities used to simplify working
 * with DOM nodes.
 * Currently minimized for the standalone speech rule engine.
 * @author clchen@google.com (Charles L. Chen)
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


goog.provide('sre.DomUtil');



/**
 * Create the namespace
 * @constructor
 */
sre.DomUtil = function() {
};


/**
 * Converts a NodeList into an array
 * @param {!(NodeList|NamedNodeMap)} nodeList The nodeList.
 * @return {!Array} The array of nodes in the nodeList.
 */
sre.DomUtil.toArray = function(nodeList) {
  var nodeArray = [];
  for (var i = 0; i < nodeList.length; i++) {
    nodeArray.push(nodeList[i]);
  }
  return nodeArray;
};


/**
 * Removes all empty strings from an array of strings.
 * @param {Array.<string>} strs An array of strings.
 * @return {Array.<string>} The cleaned array.
 */
sre.DomUtil.removeEmpty = function(strs) {
  return strs.filter(function(str) {return str;});
};


/**
 * Trims the whitespace in an XML input string.
 * @param {string} input The XML input string.
 * @return {string} The string with whitespace removed between tags.
 * @private
 */
sre.DomUtil.trimInput_ = function(input) {
  return input.replace(/>\s+</g, '><').trim();
};


/**
 * Parses the XML input string into an XML structure.
 * @param {string} input The XML input string.
 * @param {function (new:Error, string)=} opt_error Optional error function.
 * @return {!Element} The XML document structure corresponding to the node.
 */
sre.DomUtil.parseInput = function(input, opt_error) {
  var error = opt_error || Error;
  var dp = new sre.SystemExternal.xmldom.DOMParser();
  var clean_input = sre.DomUtil.trimInput_(input);
  if (!clean_input) {
    var newError = new error('Empty input!');
    throw newError;
  }
  try {
    var result = dp.parseFromString(clean_input, 'text/xml').documentElement;
    sre.XpathUtil.prefixNamespace(result);
    return result;
  } catch (err) {
    throw new error('Illegal input: ' + err.message);
  }
};
