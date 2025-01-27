// Copyright 2017-21 Volker Sorge
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
 * @fileoverview A simple audio renderer that ignores all prosody.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */
goog.provide('sre.StringRenderer');

goog.require('sre.AbstractAudioRenderer');



/**
 * @constructor
 * @extends {sre.AbstractAudioRenderer}
 */
sre.StringRenderer = function() {
  sre.StringRenderer.base(this, 'constructor');
};
goog.inherits(sre.StringRenderer, sre.AbstractAudioRenderer);


/**
 * @override
 */
sre.StringRenderer.prototype.markup = function(descrs) {
  var str = '';
  var markup = sre.AudioUtil.personalityMarkup(descrs);
  var clean = markup.filter(function(x) {return x.span;});
  if (!clean.length) {
    return str;
  }
  var len = clean.length - 1;
  for (var i = 0, descr; descr = clean[i]; i++) {
    if (descr.span) {
      str += this.merge(descr.span);
    }
    if (i >= len) continue;
    var join = descr.join;
    str += (typeof join === 'undefined') ? this.getSeparator() : join;
  }
  return str;
};
