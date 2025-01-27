// Copyright 2019-21 Volker Sorge
// Copyright (c) 2019 The MathJax Consortium
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
 * @fileoverview A fake speech generator to compute color annotations.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.ColorGenerator');

goog.require('sre.AbstractSpeechGenerator');
goog.require('sre.ContrastPicker');
goog.require('sre.RebuildStree');
goog.require('sre.WalkerUtil');



/**
 * @constructor
 * @extends {sre.AbstractSpeechGenerator}
 */
sre.ColorGenerator = function() {
  sre.ColorGenerator.base(this, 'constructor');

  this.modality = sre.EnrichMathml.addPrefix('foreground');

  this.contrast = new sre.ContrastPicker();

};
goog.inherits(sre.ColorGenerator, sre.AbstractSpeechGenerator);


/**
 * @override
 */
sre.ColorGenerator.prototype.getSpeech = function(node, xml) {
  return sre.WalkerUtil.getAttribute(node, this.modality);
};


/**
 * @override
 */
sre.ColorGenerator.prototype.generateSpeech = function(node, xml) {
  if (!this.getRebuilt()) {
    this.setRebuilt(new sre.RebuildStree(/** @type {!Element} */(node)));
  }
  this.colorLeaves_(node);
  return sre.WalkerUtil.getAttribute(node, this.modality);
};


/**
 * Colors the leave nodes of an XML tree.
 * @param {!Node} node The root node.
 * @private
 */
sre.ColorGenerator.prototype.colorLeaves_ = function(node) {
  let leaves = [];
  sre.ColorGenerator.visitStree_(this.getRebuilt().streeRoot, leaves, {});
  for (let id of leaves) {
    let color = this.contrast.generate();
    let success = false;
    if (Array.isArray(id)) {
      success = id.map(x => this.colorLeave_(node, x, color)).
          reduce((x, y) => x || y, false);
    } else {
      success = this.colorLeave_(node, id, color);
    }
    if (success) {
      this.contrast.increment();
    }
  }
};


/**
 * Colors a single leave node in an XML tree.
 * @param {!Node} node The node to color.
 * @param {string} id The ID of the node.
 * @param {string} color The color string.
 * @return {boolean} Returns true if successful.
 * @private
 */
sre.ColorGenerator.prototype.colorLeave_ = function(node, id, color) {
  let aux = sre.WalkerUtil.getBySemanticId(node, id);
  if (aux) {
    aux.setAttribute(this.modality, color);
    return true;
  }
  return false;
};


/**
 * Visits semantic tree depth-first and collates leaves.
 * @param {sre.SemanticNode} tree The semantic root node of the current tree.
 * @param {Array.<number|Array.<number>>} leaves Ids or id lists of leaves. This
 *     is array is a collator for tail recursion.
 * @param {Object.<boolean>} ignore Record of ids to be ignored.
 * @private
 */
sre.ColorGenerator.visitStree_ = function(tree, leaves, ignore) {
  if (!tree.childNodes.length) {
    if (!ignore[tree.id]) {
      leaves.push(tree.id);
    }
    return;
  }
  if (tree.contentNodes.length) {
    if (tree.type === 'punctuated') {
      tree.contentNodes.forEach(x => ignore[x.id] = true);
    }
    if (tree.role !== 'implicit') {
      leaves.push(tree.contentNodes.map(x => x.id));
    }
  }
  if (tree.childNodes.length) {
    if (tree.role === 'implicit') {
      let factors = [];
      let rest = [];
      for (let child of tree.childNodes) {
        let tt = [];
        sre.ColorGenerator.visitStree_(child, tt, ignore);
        if (tt.length <= 2) {
          factors.push(tt.shift());
        }
        rest = rest.concat(tt);
      }
      leaves.push(factors);
      rest.forEach(x => leaves.push(x));
      return;
    }
    tree.childNodes.forEach(
        x => sre.ColorGenerator.visitStree_(x, leaves, ignore));
  }
};
