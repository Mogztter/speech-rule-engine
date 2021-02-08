// Copyright 2016 Volker Sorge
// Copyright (c) 2016 The MathJax Consortium
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
 * @fileoverview Italian prefix rules.
 * @author v.sorge@mathjax.com (Volker Sorge)
 */

goog.provide('sre.PrefixItalian');


/**
 * Italian prefix rules.
 */
sre.PrefixItalian = {
  "modality": "prefix",
  "domain": "default",
  "locale": "it",
  "rules": [
    [
      "Rule",
      "numerator",
      "default",
      "[t] \"numeratore\"; [p] (pause:200)",
      "self::*",
      "name(../..)=\"fraction\"",
      "count(preceding-sibling::*)=0"
    ],
    [
      "Rule",
      "denominator",
      "default",
      "[t] \"denominatore\"; [p] (pause:200)",
      "self::*",
      "name(../..)=\"fraction\"",
      "count(preceding-sibling::*)=1"
    ],
    [
      "Rule",
      "base",
      "default",
      "[t] \"base\"; [p] (pause:200)",
      "self::*",
      "count(preceding-sibling::*)=0",
      "name(../..)=\"superscript\""
    ],
    [
      "Alias",
      "base",
      "self::*",
      "count(preceding-sibling::*)=0",
      "name(../..)=\"subscript\""
    ],
    [
      "Alias",
      "base",
      "self::*",
      "count(preceding-sibling::*)=0",
      "name(../..)=\"overscore\""
    ],
    [
      "Alias",
      "base",
      "self::*",
      "count(preceding-sibling::*)=0",
      "name(../..)=\"underscore\""
    ],
    [
      "Alias",
      "base",
      "self::*",
      "count(preceding-sibling::*)=0",
      "name(../..)=\"tensor\""
    ],
    [
      "Alias",
      "base",
      "self::*",
      "count(preceding-sibling::*)=0",
      "name(../..)=\"limlower\""
    ],
    [
      "Alias",
      "base",
      "self::*",
      "count(preceding-sibling::*)=0",
      "name(../..)=\"limupper\""
    ],
    [
      "Alias",
      "base",
      "self::*",
      "count(preceding-sibling::*)=0",
      "name(../..)=\"limboth\""
    ],
    [
      "Rule",
      "exponent",
      "default",
      "[t] \"esponente\"; [p] (pause:200)",
      "self::*",
      "name(../..)=\"superscript\"",
      "count(preceding-sibling::*)=1"
    ],
    [
      "Rule",
      "subscript",
      "default",
      "[t] \"pedice\"; [p] (pause:200)",
      "self::*",
      "name(../..)=\"subscript\"",
      "count(preceding-sibling::*)=1"
    ],
    [
      "Rule",
      "overscript",
      "default",
      "[t] \"apice\"; [p] (pause:200)",
      "self::*",
      "count(preceding-sibling::*)=1",
      "name(../..)=\"overscore\""
    ],
    [
      "Alias",
      "overscript",
      "self::*",
      "count(preceding-sibling::*)=1",
      "name(../..)=\"limupper\""
    ],
    [
      "Alias",
      "overscript",
      "self::*",
      "count(preceding-sibling::*)=2",
      "name(../..)=\"limboth\""
    ],
    [
      "Rule",
      "underscript",
      "default",
      "[t] \"sottoscritto\"; [p] (pause:200)",
      "self::*",
      "count(preceding-sibling::*)=1",
      "name(../..)=\"underscore\""
    ],
    [
      "Alias",
      "underscript",
      "self::*",
      "count(preceding-sibling::*)=1",
      "name(../..)=\"limlower\""
    ],
    [
      "Alias",
      "underscript",
      "self::*",
      "count(preceding-sibling::*)=1",
      "name(../..)=\"limboth\""
    ],
    [
      "Rule",
      "radicand",
      "default",
      "[t] \"radicando\"; [p] (pause:200)",
      "self::*",
      "name(../..)=\"sqrt\""
    ],
    [
      "Rule",
      "radicand",
      "default",
      "[t] \"radicando\"; [p] (pause:200)",
      "self::*",
      "name(../..)=\"root\"",
      "count(preceding-sibling::*)=1"
    ],
    [
      "Rule",
      "index",
      "default",
      "[t] \"indice\"; [p] (pause:200)",
      "self::*",
      "name(../..)=\"root\"",
      "count(preceding-sibling::*)=0"
    ],
    [
      "Rule",
      "leftsub",
      "default",
      "[t] \"pedice sinistro\"; [p] (pause:200)",
      "self::*",
      "name(../..)=\"tensor\"",
      "@role=\"leftsub\""
    ],
    [
      "Rule",
      "leftsub",
      "default",
      "[t] CSFordinalPosition (grammar:gender=\"male\"); [t] \"pedice sinistro\"; [p] (pause:200)",
      "self::*",
      "name(../..)=\"punctuated\"",
      "name(../../../..)=\"tensor\"",
      "../../@role=\"leftsub\""
    ],
    [
      "Rule",
      "leftsuper",
      "default",
      "[t] \"apice sinistro\"; [p] (pause:200)",
      "self::*",
      "name(../..)=\"tensor\"",
      "@role=\"leftsuper\""
    ],
    [
      "Rule",
      "leftsuper",
      "default",
      "[t] CSFordinalPosition (grammar:gender=\"male\"); [t] \"apice sinistro\"; [p] (pause:200)",
      "self::*",
      "name(../..)=\"punctuated\"",
      "name(../../../..)=\"tensor\"",
      "../../@role=\"leftsuper\""
    ],
    [
      "Rule",
      "rightsub",
      "default",
      "[t] \"pedice destro\"; [p] (pause:200)",
      "self::*",
      "name(../..)=\"tensor\"",
      "@role=\"rightsub\""
    ],
    [
      "Rule",
      "rightsub",
      "default",
      "[t] CSFordinalPosition (grammar:gender=\"male\"); [t] \"pedice destro\"; [p] (pause:200)",
      "self::*",
      "name(../..)=\"punctuated\"",
      "name(../../../..)=\"tensor\"",
      "../../@role=\"rightsub\""
    ],
    [
      "Rule",
      "rightsuper",
      "default",
      "[t] \"apice destro\"; [p] (pause:200)",
      "self::*",
      "name(../..)=\"tensor\"",
      "@role=\"rightsuper\""
    ],
    [
      "Rule",
      "rightsuper",
      "default",
      "[t] CSFordinalPosition (grammar:gender=\"male\"); [t] \"apice destro\"; [p] (pause:200)",
      "self::*",
      "name(../..)=\"punctuated\"",
      "name(../../../..)=\"tensor\"",
      "../../@role=\"rightsuper\""
    ],
    [
      "Rule",
      "choice",
      "default",
      "[t] \"quantità scelta\"; [p] (pause:200)",
      "self::line",
      "@role=\"binomial\"",
      "parent::*/parent::vector",
      "count(preceding-sibling::*)=0"
    ],
    [
      "Rule",
      "select",
      "default",
      "[t] \"quantità selezione\"; [p] (pause:200)",
      "self::line",
      "@role=\"binomial\"",
      "parent::*/parent::vector",
      "count(preceding-sibling::*)=1"
    ],
    [
      "Rule",
      "row",
      "default",
      "[t] CSFordinalPosition (grammar:gender=\"female\"); [t] \"riga\"; [p] (pause:200)",
      "self::row"
    ],
    [
      "Aliases",
      "row",
      "self::line"
    ],
    [
      "Rule",
      "cell",
      "default",
      "[n] ../..; [t] CSFordinalPosition (grammar:gender=\"female\"); [t] \"colonna\"; [p] (pause:200)",
      "self::cell",
      "contains(@grammar,\"depth\")"
    ],
    [
      "Rule",
      "cell",
      "default",
      "[t] CSFordinalPosition (grammar:gender=\"female\"); [t] \"colonna\"; [p] (pause:200)",
      "self::cell"
    ]
  ]
};