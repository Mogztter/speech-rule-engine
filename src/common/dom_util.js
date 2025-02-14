// Copyright 2013 Google Inc.
// Copyright 2014-21 Volker Sorge
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

goog.require('sre.Engine');
goog.require('sre.SystemExternal');
goog.require('sre.XpathUtil');


/**
 * Converts a NodeList into an array
 * @param {!(NodeList|NamedNodeMap)} nodeList The nodeList.
 * @return {!Array} The array of nodes in the nodeList.
 */
sre.DomUtil.toArray = function(nodeList) {
  var nodeArray = [];
  for (var i = 0, m = nodeList.length; i < m; i++) {
    nodeArray.push(nodeList[i]);
  }
  return nodeArray;
};


/**
 * Trims the whitespace in an XML input string.
 * @param {string} input The XML input string.
 * @return {string} The string with whitespace removed between tags.
 * @private
 */
sre.DomUtil.trimInput_ = function(input) {
  input = input.replace(/&nbsp;/g, ' ');
  return input.replace(/>[ \f\n\r\t\v​]+</g, '><').trim();
};


/**
 * Set of XML entities.
 * @type {Object.<boolean>}
 */
sre.DomUtil.XML_ENTITIES =
    {'&lt;': true, '&gt;': true, '&amp;': true, '&quot;': true, '&apos;': true};


/**
 * Parses the XML input string into an XML structure.
 * @param {string} input The XML input string.
 * @param {function (new:Error, string)=} opt_error Optional error function.
 * @return {!Element} The XML document structure corresponding to the node.
 */
sre.DomUtil.parseInput = function(input, opt_error) {
  var error = opt_error || sre.Engine.Error;
  var dp = new sre.SystemExternal.xmldom.DOMParser();
  var clean_input = sre.DomUtil.trimInput_(input);
  var allValues = clean_input.match(/\&(?!lt|gt|amp|quot|apos)\w+;/g);
  var html = !!allValues;
  if (!clean_input) {
    throw new error('Empty input!');
  }
  try {
    var doc = dp.parseFromString(clean_input, html ? 'text/html' : 'text/xml');
    if (sre.Engine.getInstance().mode === sre.Engine.Mode.HTTP) {
      sre.XpathUtil.currentDocument = doc;
      return html ? doc.body.childNodes[0] : doc.documentElement;
    }
    return doc.documentElement;
  } catch (err) {
    throw new error('Illegal input: ' + err.message);
  }
};


/**
 * Missing Node interface.
 * @enum {number}
 */
sre.DomUtil.NodeType = {
  ELEMENT_NODE: 1,
  ATTRIBUTE_NODE: 2,
  TEXT_NODE: 3,
  CDATA_SECTION_NODE: 4,
  ENTITY_REFERENCE_NODE: 5,
  ENTITY_NODE: 6,
  PROCESSING_INSTRUCTION_NODE: 7,
  COMMENT_NODE: 8,
  DOCUMENT_NODE: 9,
  DOCUMENT_TYPE_NODE: 10,
  DOCUMENT_FRAGMENT_NODE: 11,
  NOTATION_NODE: 12
};


/**
 * Cleanly replaces child nodes in a parent.
 * @param {!Node} oldNode The node to be replaced.
 * @param {!Node} newNode The replacement node.
 */
sre.DomUtil.replaceNode = function(oldNode, newNode) {
  if (!oldNode.parentNode) {
    return;
  }
  oldNode.parentNode.insertBefore(newNode, oldNode);
  oldNode.parentNode.removeChild(oldNode);
};


/**
 * Creates a node in the current document. This is a wrapper function that
 * ensures that a node is created in the correct document tree.
 * @param {string} tag The tagname of the node.
 * @return {!Element} The newly create node.
 */
sre.DomUtil.createElement = function(tag) {
  return sre.SystemExternal.document.createElement(tag);
};


/**
 * Creates a node in the current document in a given namespace. This is a
 * wrapper function that ensures that a node is created in the correct document
 * tree.
 * @param {string} url The namespace url for the node.
 * @param {string} tag The tagname of the node.
 * @return {!Element} The newly create node.
 */
sre.DomUtil.createElementNS = function(url, tag) {
  return sre.SystemExternal.document.createElementNS(url, tag);
};


/**
 * Creates a text node in the current document. This is a wrapper function that
 * ensures that a node is created in the correct document tree.
 * @param {string} content The text content for the node.
 * @return {!Element} The newly create node.
 */
sre.DomUtil.createTextNode = function(content) {
  return sre.SystemExternal.document.createTextNode(content);
};


/**
 * Pretty prints an XML representation while dealing with mixed content:
 * Example:
 *
 * <a>A<b>B</b>C</a> is rewritten to
 * <a>A
 *   <b>B</b>
 *    C
 * </a>
 * @param {string} xml The serialised XML string.
 * @return {string} The formatted string.
 */
sre.DomUtil.formatXml = function(xml) {
  var formatted = '';
  var reg = /(>)(<)(\/*)/g;  // Separate at touching tags.
  xml = xml.replace(reg, '$1\r\n$2$3');
  var pad = 0;
  var split = xml.split('\r\n');
  reg = /(\.)*(<)(\/*)/g;    // Separate at any remaining tags.
  split = split.map(x => x.replace(reg, '$1\r\n$2$3').split('\r\n')).
      reduce(function(x, y) {return x.concat(y);}, []);
  while (split.length) {
    var node = split.shift();
    if (!node) continue;
    var indent = 0;
    if (node.match(/^<\w[^>\/]*>[^>]+$/)) {
      // Start node with trailing content.
      var match = sre.DomUtil.matchingStartEnd_(node, split[0]);
      if (match[0]) {    // Combine with end node
        if (match[1]) {  // Trailing mixed content after end node.
          node = node + split.shift().slice(0, - match[1].length);
          if (match[1].trim()) {  // In case of trailing spaces.
            split.unshift(match[1]);
          }
        } else {
          node = node + split.shift();
        }
      } else {
        indent = 1;
      }
    } else if (node.match(/^<\/\w/)) {
      // End node.
      if (pad != 0) {
        pad -= 1;
      }
    } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
      // Simple start node.
      indent = 1;
    } else if (node.match(/^<\w[^>]*\/>.+$/)) {
      // Empty tag node with trailing mixed content.
      let position = node.indexOf('>') + 1;
      let rest = node.slice(position);
      if (rest.trim()) { // In case of trailing spaces.
        split.unshift();
      }
      node = node.slice(0, position);
    } else {
      // Empty tag node
      indent = 0;
    }
    formatted += new Array(pad + 1).join('  ') + node + '\r\n';
    pad += indent;
  }
  return formatted;
};


/**
 * Checks for two tags if the second is a matching end tag for the first.
 * @param {string} start The start tag.
 * @param {string} end The next, possible end tag.
 * @return {Array.<boolean| string>} A pair indicating success and the possible
 *     remainder after the end tag, in case it is followed by mixed content.
 * @private
 */
sre.DomUtil.matchingStartEnd_ = function(start, end) {
  if (!end) {
    return [false, ''];
  }
  var tag1 = start.match(/^<([^> ]+).*>/);
  var tag2 = end.match(/^<\/([^>]+)>(.*)/);
  return (tag1 && tag2 && tag1[1] === tag2[1]) ?
      [true, tag2[2]] : [false, ''];
};


/**
 * Transforms a data attribute name into its camel cased version.
 * @param {string} attr Micro data attributes.
 * @return {string} The camel cased attribute.
 */
sre.DomUtil.dataAttribute = function(attr) {
  if (attr.match(/^data-/)) {
    attr = attr.substr(5);
  }
  return attr.replace(/-([a-z])/g, function(letter, index) {
    return index.toUpperCase();});
};


/**
 * Retrieves a data attribute from a given node. Tries using microdata access if
 * possible.
 * @param {!Node} node A DOM node.
 * @param {string} attr The data attribute.
 * @return {string} The value for that attribute.
 */
sre.DomUtil.getDataAttribute = function(node, attr) {
  if (node.dataset) {
    return node.dataset[sre.DomUtil.dataAttribute(attr)];
  }
  return node.getAttribute(attr);
};


/**
 * A wrapper function for query selector on a node wrt. to an attribute. If
 * query selectors are not implemented on that node it reverts to Xpath.
 * @param {!Node} node A DOM node.
 * @param {string} attr The data attribute.
 * @return {!Array.<Node>} The list of result nodes.
 */
sre.DomUtil.querySelectorAllByAttr = function(node, attr) {
  return (node.querySelectorAll ?
          sre.DomUtil.toArray(node.querySelectorAll('[' + attr + ']')) :
          sre.XpathUtil.evalXPath('.//*[@' + attr + ']', node));
};


/**
 * A wrapper function for query selector on a node wrt. to an attribute. If
 * query selectors are not implemented on that node it reverts to Xpath.
 * @param {!Node} node A DOM node.
 * @param {string} attr The data attribute.
 * @param {string} value The value of the data attribute.
 * @return {!Array.<Node>} The list of result nodes.
 */
sre.DomUtil.querySelectorAllByAttrValue = function(node, attr, value) {
  return (node.querySelectorAll ?
          sre.DomUtil.toArray(
              node.querySelectorAll('[' + attr + '="' + value + '"]')) :
          sre.XpathUtil.evalXPath('.//*[@' + attr + '="' + value + '"]', node));
};


/**
 * A wrapper function for query selector on a node wrt. to a tag name. If
 * query selectors are not implemented on that node it reverts to Xpath.
 * @param {!Node} node A DOM node.
 * @param {string} tag The tag name.
 * @return {!Array.<Node>} The list of result nodes.
 */
sre.DomUtil.querySelectorAll = function(node, tag) {
  return (node.querySelectorAll ?
          sre.DomUtil.toArray(node.querySelectorAll(tag)) :
          sre.XpathUtil.evalXPath('.//' + tag, node));
};


/**
 * Returns the tagname of an element node in upper case.
 * @param {Element} node The node.
 * @return {string} The node's tagname.
 */
sre.DomUtil.tagName = function(node) {
  return node.tagName.toUpperCase();
};
