{
  "modality": "prefix",
  "locale": "de",
  "domain": "default",
  "rules": [
    [
      "Rule",
      "numerator",
      "default",
      "[t] \"Zähler\" (pause:200)",
      "self::*",
      "name(../..)=\"fraction\"",
      "count(preceding-sibling::*)=0"
    ],
    [
      "Rule",
      "denominator",
      "default",
      "[t] \"Nenner\" (pause:200)",
      "self::*",
      "name(../..)=\"fraction\"",
      "count(preceding-sibling::*)=1"
    ],
    [
      "Rule",
      "base",
      "default",
      "[t] \"Basis\" (pause:200)",
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
      "[t] \"Exponent\" (pause:200)",
      "self::*",
      "name(../..)=\"superscript\"",
      "count(preceding-sibling::*)=1"
    ],
    [
      "Rule",
      "subscript",
      "default",
      "[t] \"Index\" (pause:200)",
      "self::*",
      "name(../..)=\"subscript\"",
      "count(preceding-sibling::*)=1"
    ],
    [
      "Rule",
      "overscript",
      "default",
      "[t] \"Oberer Grenzwert\" (pause:200)",
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
      "[t] \"Unterer Grenzwert\" (pause:200)",
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
      "[t] \"Radikand\" (pause:200)",
      "self::*",
      "name(../..)=\"sqrt\""
    ],
    [
      "Rule",
      "radicand",
      "default",
      "[t] \"Radikand\" (pause:200)",
      "self::*",
      "name(../..)=\"root\"",
      "count(preceding-sibling::*)=1"
    ],
    [
      "Rule",
      "index",
      "default",
      "[t] \"Wurzelexponent\" (pause:200)",
      "self::*",
      "name(../..)=\"root\"",
      "count(preceding-sibling::*)=0"
    ],
    [
      "Rule",
      "leftsub",
      "default",
      "[t] \"linker unterer Index\" (pause:200)",
      "self::*",
      "name(../..)=\"tensor\"",
      "@role=\"leftsub\""
    ],
    [
      "Rule",
      "leftsub",
      "default",
      "[t] CSFordinalPosition; [t] \"linker unterer Index\" (pause:200)",
      "self::*",
      "name(../..)=\"punctuated\"",
      "name(../../../..)=\"tensor\"",
      "../../@role=\"leftsub\""
    ],
    [
      "Rule",
      "leftsuper",
      "default",
      "[t] \"linker oberer Index\" (pause:200)",
      "self::*",
      "name(../..)=\"tensor\"",
      "@role=\"leftsuper\""
    ],
    [
      "Rule",
      "leftsuper",
      "default",
      "[t] CSFordinalPosition; [t] \"linker oberer Index\" (pause:200)",
      "self::*",
      "name(../..)=\"punctuated\"",
      "name(../../../..)=\"tensor\"",
      "../../@role=\"leftsuper\""
    ],
    [
      "Rule",
      "rightsub",
      "default",
      "[t] \"rechter unterer Index\" (pause:200)",
      "self::*",
      "name(../..)=\"tensor\"",
      "@role=\"rightsub\""
    ],
    [
      "Rule",
      "rightsub",
      "default",
      "[t] CSFordinalPosition; [t] \"rechter unterer Index\" (pause:200)",
      "self::*",
      "name(../..)=\"punctuated\"",
      "name(../../../..)=\"tensor\"",
      "../../@role=\"rightsub\""
    ],
    [
      "Rule",
      "rightsuper",
      "default",
      "[t] \"rechter oberer Index\" (pause:200)",
      "self::*",
      "name(../..)=\"tensor\"",
      "@role=\"rightsuper\""
    ],
    [
      "Rule",
      "rightsuper",
      "default",
      "[t] CSFordinalPosition; [t] \"rechter oberer Index\" (pause:200)",
      "self::*",
      "name(../..)=\"punctuated\"",
      "name(../../../..)=\"tensor\"",
      "../../@role=\"rightsuper\""
    ],
    [
      "Rule",
      "choice",
      "default",
      "[t] \"Grundgesamtheit\" (pause:200)",
      "self::line",
      "@role=\"binomial\"",
      "parent::*/parent::vector",
      "count(preceding-sibling::*)=0"
    ],
    [
      "Rule",
      "select",
      "default",
      "[t] \"Stichprobengröße\" (pause:200)",
      "self::line",
      "@role=\"binomial\"",
      "parent::*/parent::vector",
      "count(preceding-sibling::*)=1"
    ],
    [
      "Rule",
      "row",
      "default",
      "[t] CSFordinalPosition; [t] \"Zeile\" (pause:200)",
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
      "[n] ../..; [t] CSFordinalPosition; [t] \"Spalte\" (pause:200)",
      "self::cell",
      "contains(@grammar,\"depth\")"
    ],
    [
      "Rule",
      "cell",
      "default",
      "[t] CSFordinalPosition; [t] \"Spalte\" (pause:200)",
      "self::cell"
    ]
  ]
}
