// Copyright 2016 Volker Sorge
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
 * @fileoverview Datastructure for handling dynamic constraints. Dynamic
 *     constraints separate the different axes for customisation of speech rule
 *     sets.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.DynamicCstr');
goog.provide('sre.DynamicCstr.Comparator');
goog.provide('sre.DynamicCstr.Parser');
goog.provide('sre.DynamicProperties');

goog.require('sre.Engine');



//TODO: (MOSS) Revisit after ClearSpeak preference introduction.
//
/**
 * @constructor
 * @param {!Object.<sre.Engine.Axis, !Array.<string>>} properties The property
 *     mapping.
 * @param {sre.DynamicCstr.Order=} opt_order A parse order of the keys.
 */
sre.DynamicProperties = function(properties, opt_order) {

  /**
   * @type {!Object.<sre.Engine.Axis, !Array.<string>>}
   * @private
   */
  this.properties_ = properties;
  
  /**
   * @type {!sre.DynamicCstr.Order}
   * @private
   */
  this.order_ = opt_order || Object.keys(properties);

};


/**
 * @return {!Object.<sre.Engine.Axis, Array.<string>>} The components of the
 *     constraint.
 */
sre.DynamicProperties.prototype.getProperties = function() {
  return this.properties_;
};


/**
 * @return {sre.DynamicCstr.Order} The priority order of constraint attributes
 *     in the comparator.
 */
sre.DynamicProperties.prototype.getOrder = function() {
  return this.order_;
};


/**
 * @return {!sre.DynamicCstr.Order} The components of the constraint.
 */
sre.DynamicProperties.prototype.getKeys = function() {
  return this.order_;
};


/**
 * Returns the value of the constraint for a particular attribute key.
 * @param {!sre.Engine.Axis} key The attribute key.
 * @return {Array.<string>} The component value of the constraint.
 */
sre.DynamicProperties.prototype.getProperty = function(key) {
  return this.properties_[key];
};


/**
 * @override
 */
sre.DynamicProperties.prototype.toString = function() {
  var cstrStrings = [];
  this.order_.forEach(goog.bind(function(key) {
    cstrStrings.push(key + ': ' + this.getProperty(key).toString());
  }, this));
  return cstrStrings.join('\n');
};



/**
 * Dynamic constraints are a means to specialize rules that can be changed
 * dynamically by the user, for example by choosing different styles, etc.
 * @constructor
 * @param {!Object.<sre.Engine.Axis, string>} cstr The constraint mapping.
 * @param {sre.DynamicCstr.Order=} opt_order A parse order of the keys.
 * @extends {sre.DynamicProperties}
 */
sre.DynamicCstr = function(cstr, opt_order) {

  /**
   * @type {!Object.<sre.Engine.Axis, string>}
   * @private
   */
  this.components_ = cstr;

  var properties = {};
  for (var key in cstr) {
    properties[key] = [cstr[key]];
  }
  sre.DynamicCstr.base(this, 'constructor', properties, opt_order);
};
goog.inherits(sre.DynamicCstr, sre.DynamicProperties);


/**
 * @return {!Object.<sre.Engine.Axis, string>} The components of the
 *     constraint.
 */
sre.DynamicCstr.prototype.getComponents = function() {
  return this.components_;
};


/**
 * Returns the value of the constraint for a particular attribute key.
 * @param {!sre.Engine.Axis} key The attribute key.
 * @return {string} The component value of the constraint.
 */
sre.DynamicCstr.prototype.getValue = function(key) {
  return this.components_[key];
};


/**
 * @override
 */
sre.DynamicCstr.prototype.toString = function() {
  var cstrStrings = [];
  this.order_.forEach(goog.bind(function(key) {
    cstrStrings.push(this.getValue(key));
  }, this));
  return cstrStrings.join('.');
};


/**
 * Tests whether the dynamic constraint is equal to a given one.
 * @param {!sre.DynamicCstr} cstr Dynamic constraints.
 * @return {boolean} True if the preconditions apply to the node.
 */
sre.DynamicCstr.prototype.equal = function(cstr) {
  var keys1 = cstr.getKeys();
  if (this.order_.length !== keys1.length) {
    return false;
  }
  for (var j = 0, key; key = keys1[j]; j++) {
    var comp2 = this.getValue(key);
    if (!comp2 || cstr.getValue(key) !== comp2) {
      return false;
    }
  }
  return true;
};


/**
 * Ordering of dynamic constraint attributes.
 * @typedef {!Array.<sre.Engine.Axis>}
 */
sre.DynamicCstr.Order;


/**
 * @type {!sre.DynamicCstr.Order}
 */
sre.DynamicCstr.DEFAULT_ORDER = [
  sre.Engine.Axis.DOMAIN,
  sre.Engine.Axis.STYLE,
  sre.Engine.Axis.LANGUAGE,
  sre.Engine.Axis.TOPIC,
  sre.Engine.Axis.MODALITY
];


/**
 * A parser for dynamic constraint representations.
 * @constructor
 * @param {!sre.DynamicCstr.Order} order The order of attributes in the
 *     dynamic constraint string.
 */
sre.DynamicCstr.Parser = function(order) {

  /**
   * @type {!sre.DynamicCstr.Order}
   * @private
   */
  this.order_ = order;

};


/**
 * Parses the dynamic constraint for math rules, consisting of a domain and
 * style information, given as 'domain.style'.
 * @param {string} str A string representation of the dynamic constraint.
 * @return {!sre.DynamicCstr} The dynamic constraint.
 */
sre.DynamicCstr.Parser.prototype.parse = function(str) {
  var order = str.split('.');
  var cstr = {};
  if (order.length > this.order_.length) {
    throw new Error('Invalid dynamic constraint: ' + cstr);
  }
  for (var i = 0, key; key = this.order_[i], order.length; i++) {
    var value = order.shift();
    cstr[key] = value;
    sre.Engine.getInstance().axisValues[key][value] = true;
  }
  return new sre.DynamicCstr(cstr, this.order_);
};



/**
 * @interface
 */
sre.DynamicCstr.Comparator = function() { };


/**
 * @return {sre.DynamicCstr} The current reference constraint in the comparator.
 */
sre.DynamicCstr.Comparator.prototype.getReference = function() { };


/**
 * Sets the reference constraint in the comparator.
 * @param {sre.DynamicCstr} cstr A new reference constraint.
 */
sre.DynamicCstr.Comparator.prototype.setReference = function(cstr) { };


/**
 * Checks if dynamic constraints matches the reference constraint.
 * @param {!sre.DynamicCstr} cstr The dynamic constraint to match.
 * @return {boolean} True if the constraint matches a possibly relaxed version
 *     of the reference constraint.
 */
sre.DynamicCstr.Comparator.prototype.match = function(cstr) { };


/**
 * Compares two dynamic constraints for order with respect to the reference
 * constraint and the priority order of the comparator.
 * @param {!sre.DynamicCstr} cstr1 First dynamic constraint.
 * @param {!sre.DynamicCstr} cstr2 Second dynamic constraint.
 * @return {number} A negative integer, zero, or a positive integer as the first
 *     argument is less than, equal to, or greater than the second.
 */
sre.DynamicCstr.Comparator.prototype.compare = function(cstr1, cstr2) { };



// TODO (MOSS): This still implements the old style comparator. Turn into
// default comparator and implement more elaborate orderings on the rule stores.
//
/**
 * A default comparator for dynamic constraints. Has initially a reference
 * constraint with default values only.
 * @constructor
 * @implements {sre.DynamicCstr.Comparator}
 * @param {sre.DynamicCstr} cstr A reference constraint.
 */
sre.DynamicCstr.DefaultComparator = function(cstr) {

  /**
   * @type {sre.DynamicCstr}
   * @private
   */
  this.reference_ = cstr;

  /**
   * @type {sre.DynamicCstr.Order}
   * @private
   */
  this.order_ = this.reference_.getOrder();

};


/**
 * @override
 * @final
 */
sre.DynamicCstr.DefaultComparator.prototype.getReference = function() {
  return this.reference_;
};


/**
 * @override
 * @final
 */
sre.DynamicCstr.DefaultComparator.prototype.setReference = function(cstr) {
  this.reference_ = cstr;
  this.order_ = this.reference_.getOrder();
};


// We allow a default value for each dynamic constraints attribute.
// The idea is that when we can not find a speech rule matching the value for
// a particular attribute in the dynamic constraint we choose the one that has
// the value 'default'.
/**
 * @override
 */
sre.DynamicCstr.DefaultComparator.prototype.match = function(cstr) {
  var keys1 = cstr.getKeys();
  return keys1.length === this.reference_.getKeys().length &&
      keys1.every(
      goog.bind(function(key) {
        return cstr.getValue(key) == this.reference_.getValue(key) ||
            // TODO (MOSS) Sort this out with an ordered list of constraints.
            cstr.getValue(key) == 'short' ||
            cstr.getValue(key) == 'default';
      }, this));
};


/**
 * @override
 */
sre.DynamicCstr.DefaultComparator.prototype.compare = function(cstr1, cstr2) {
  var count1 = this.countMatchingValues_(cstr1);
  var count2 = this.countMatchingValues_(cstr2);
  return (count1 > count2) ? -1 : ((count2 > count1) ? 1 : 0);
};


/**
 * Counts how many dynamic constraint values match exactly the reference
 * constraint in the order specified by the comparator.
 * @param {sre.DynamicCstr} cstr Dynamic constraints.
 * @return {number} The number of matching dynamic constraint values.
 * @private
 */
sre.DynamicCstr.DefaultComparator.prototype.countMatchingValues_ = function(
    cstr) {
  var result = 0;
  for (var i = 0, key; key = this.order_[i]; i++) {
    if (this.reference_.getValue(key) === cstr.getValue(key)) {
      result++;
    } else break;
  }
  return result;
};


/**
 * Convenience method to create a standard dynamic constraint, that follows a
 * pre-prescribed order of the axes.
 * @param {...string} cstrs Dynamic constraint values for the Axes.
 * @return {!sre.DynamicCstr}
 */
sre.DynamicCstr.create = function(cstrs) {
  var axes = sre.DynamicCstr.DEFAULT_ORDER;
  var dynamicCstr = {};
  var cstrList = Array.prototype.slice.call(arguments, 0);
  for (var i = 0, l = cstrList.length, k = axes.length; i < l && i < k; i++) {
    dynamicCstr[axes[i]] = cstrList[i];
  }
  return new sre.DynamicCstr(dynamicCstr);
};


/**
 * Checks explicitly if a dynamic constraint order is indeed valid.
 * @param {sre.DynamicCstr.Order} order The order to check.
 * @return {boolean} True if the order only contains valid axis descriptions.
 */
sre.DynamicCstr.validOrder = function(order) {
  var axes = sre.DynamicCstr.DEFAULT_ORDER.slice();
  return order.every(
    function(x) {
      var index = axes.indexOf(x);
      return index !== -1 && axes.splice(index, 1);
    }
  );
};
