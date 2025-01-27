// Copyright 2016-21 Volker Sorge
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
//
// Supported by the Mozilla Foundation.

/**
 * @fileoverview Factory for trie nodes and concrete classes of trie nodes.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.BooleanTrieNode');
goog.provide('sre.DynamicTrieNode');
goog.provide('sre.QueryTrieNode');
goog.provide('sre.RootTrieNode');
goog.provide('sre.TrieNodeFactory');

goog.require('sre.AbstractTrieNode');
goog.require('sre.StaticTrieNode');


/**
 * Generates a trie node of a given kind in the given rule store.
 * @param {sre.TrieNode.Kind} kind The kind of trie nodes.
 * @param {string} constraint The constraint the trie node is generated for.
 * @param {sre.SpeechRuleContext} context A function context.
 * @return {?sre.TrieNode} The newly generated trie node.
 */
sre.TrieNodeFactory.getNode = function(kind, constraint, context) {
  switch (kind) {
    case sre.TrieNode.Kind.ROOT:
      return new sre.RootTrieNode();
    case sre.TrieNode.Kind.DYNAMIC:
      return new sre.DynamicTrieNode(constraint);
    case sre.TrieNode.Kind.QUERY:
      return new sre.QueryTrieNode(constraint, context);
    case sre.TrieNode.Kind.BOOLEAN:
      return new sre.BooleanTrieNode(constraint, context);
    default:
      return null;
  }
};



/**
 * @constructor
 * @extends {sre.AbstractTrieNode}
 */
sre.RootTrieNode = function() {
  sre.RootTrieNode.base(this, 'constructor', '',
                        function() {return true;});
  this.kind = sre.TrieNode.Kind.ROOT;
};
goog.inherits(sre.RootTrieNode, sre.AbstractTrieNode);



/**
 * @constructor
 * @extends {sre.AbstractTrieNode<string>}
 * @param {string} constraint The constraint the node represents.
 */
sre.DynamicTrieNode = function(constraint) {
  sre.DynamicTrieNode.base(this, 'constructor', constraint,
                        function(axis) {return axis === constraint;});
  this.kind = sre.TrieNode.Kind.DYNAMIC;
};
goog.inherits(sre.DynamicTrieNode, sre.AbstractTrieNode);


/**
 * Generates more refined tests depending on the type of static constraint.
 * @param {string} constraint A static constraint.
 * @return {?function(Node): boolean} An efficient test function in lieu of the
 *    xpath expression.
 * @private
 */
sre.TrieNodeFactory.constraintTest_ = function(constraint) {
  // @self::*
  if (constraint.match(/^self::\*$/)) {
    return function(node) {return true;};
  }
  // @self::tagname
  if (constraint.match(/^self::\w+$/)) {
    var tag = constraint.slice(6).toUpperCase();
    return function(node) {
      return node.tagName && sre.DomUtil.tagName(node) === tag;};
  }
  // @self::namespace:tagname
  if (constraint.match(/^self::\w+:\w+$/)) {
    var inter = constraint.split(':');
    var namespace = sre.XpathUtil.resolveNameSpace(inter[2]);
    if (!namespace) {
      return null;
    }
    tag = inter[3].toUpperCase();
    return function(node) {
      return node.localName && node.localName.toUpperCase() === tag &&
          node.namespaceURI === namespace;};
  }
  // @attr
  if (constraint.match(/^@\w+$/)) {
    var attr = constraint.slice(1);
    return function(node) {
      return node.hasAttribute && node.hasAttribute(attr);};
  }
  // @attr="value"
  if (constraint.match(/^@\w+="[\w\d ]+"$/)) {
    var split = constraint.split('=');
    attr = split[0].slice(1);
    var value = split[1].slice(1, -1);
    return function(node) {
      return node.hasAttribute && node.hasAttribute(attr) &&
          node.getAttribute(attr) === value;};
  }
  // @attr!="value"
  if (constraint.match(/^@\w+!="[\w\d ]+"$/)) {
    split = constraint.split('!=');
    attr = split[0].slice(1);
    value = split[1].slice(1, -1);
    return function(node) {
      return !node.hasAttribute || !node.hasAttribute(attr) ||
          node.getAttribute(attr) !== value;};
  }
  // contains(@grammar, "something")
  if (constraint.match(/^contains\(\s*@grammar\s*,\s*"[\w\d ]+"\s*\)$/)) {
    split = constraint.split('"');
    value = split[1];
    return function(node) {
      return sre.Grammar.getInstance().getParameter(value);
    };
  }
  // not(contains(@grammar, "something"))
  if (constraint.match(
      /^not\(\s*contains\(\s*@grammar\s*,\s*"[\w\d ]+"\s*\)\s*\)$/)) {
    split = constraint.split('"');
    value = split[1];
    return function(node) {
      return !sre.Grammar.getInstance().getParameter(value);
    };
  }
  // name(../..)="something"
  if (constraint.match(/^name\(\.\.\/\.\.\)="\w+"$/)) {
    split = constraint.split('"');
    tag = split[1].toUpperCase();
    return function(node) {
      return node.parentNode && node.parentNode.parentNode &&
          node.parentNode.parentNode.tagName &&
          sre.DomUtil.tagName(node.parentNode.parentNode) === tag;
    };
  }
  // count(preceding-sibling::*)=n
  if (constraint.match(/^count\(preceding-sibling::\*\)=\d+$/)) {
    split = constraint.split('=');
    var num = parseInt(split[1], 10);
    return function(node) {
      return node.parentNode &&
          node.parentNode.childNodes[num] === node;
    };
  }
  return null;
};



/**
 * @constructor
 * @extends {sre.StaticTrieNode}
 * @param {string} constraint The constraint the node represents.
 * @param {sre.SpeechRuleContext} context The rule context.
 */
sre.QueryTrieNode = function(constraint, context) {
  this.context_ = context;
  sre.QueryTrieNode.base(this, 'constructor', constraint,
                         sre.TrieNodeFactory.constraintTest_(constraint));
  this.kind = sre.TrieNode.Kind.QUERY;
};
goog.inherits(sre.QueryTrieNode, sre.StaticTrieNode);


/**
 * @override
 */
sre.QueryTrieNode.prototype.applyTest = function(object) {
  return this.test ? this.test(object) :
      this.context_.applyQuery(object, this.constraint) === object;
};



/**
 * @constructor
 * @extends {sre.StaticTrieNode}
 * @param {string} constraint The constraint the node represents.
 * @param {sre.SpeechRuleContext} context The rule context.
 */
sre.BooleanTrieNode = function(constraint, context) {
  this.context_ = context;
  sre.BooleanTrieNode.base(
      this, 'constructor', constraint,
      sre.TrieNodeFactory.constraintTest_(constraint));
  this.kind = sre.TrieNode.Kind.BOOLEAN;
};
goog.inherits(sre.BooleanTrieNode, sre.StaticTrieNode);


/**
 * @override
 */
sre.BooleanTrieNode.prototype.applyTest = function(object) {
  return this.test ? this.test(object) :
      this.context_.applyConstraint(object, this.constraint);
};
