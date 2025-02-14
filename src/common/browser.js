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
 * @fileoverview Setup for browser integration of speech rule engine.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */
goog.provide('sre.Browser');

goog.require('sre.Engine.Mode');
goog.require('sre.System');


/**
 * Default setup of the Engine.
 */
(sre.System.getInstance()).setupEngine(
    {mode: sre.Engine.Mode.HTTP,
      domain: 'mathspeak',
      style: 'default'}
);

var SRE = sre.System.getInstance();
