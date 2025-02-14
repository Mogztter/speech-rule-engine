{
  "modality": "prefix",
  "domain": "default",
  "locale": "en",
  "rules": [
    [
      "Rule",
      "numerator",
      "default",
      "[t] \"Numerator\" (pause:200)",
      "self::*",
      "name(../..)=\"fraction\"",
      "count(preceding-sibling::*)=0"
    ],
    [
      "Rule",
      "denominator",
      "default",
      "[t] \"Denominator\" (pause:200)",
      "self::*",
      "name(../..)=\"fraction\"",
      "count(preceding-sibling::*)=1"
    ],
    [
      "Rule",
      "base",
      "default",
      "[t] \"Base\" (pause:200)",
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
      "[t] \"Subscript\" (pause:200)",
      "self::*",
      "name(../..)=\"subscript\"",
      "count(preceding-sibling::*)=1"
    ],
    [
      "Rule",
      "overscript",
      "default",
      "[t] \"Overscript\" (pause:200)",
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
      "[t] \"Underscript\" (pause:200)",
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
      "[t] \"Radicand\" (pause:200)",
      "self::*",
      "name(../..)=\"sqrt\""
    ],
    [
      "Rule",
      "radicand",
      "default",
      "[t] \"Radicand\" (pause:200)",
      "self::*",
      "name(../..)=\"root\"",
      "count(preceding-sibling::*)=1"
    ],
    [
      "Rule",
      "index",
      "default",
      "[t] \"Index\" (pause:200)",
      "self::*",
      "name(../..)=\"root\"",
      "count(preceding-sibling::*)=0"
    ],
    [
      "Rule",
      "leftsub",
      "default",
      "[t] \"Left Subscript\" (pause:200)",
      "self::*",
      "name(../..)=\"tensor\"",
      "@role=\"leftsub\""
    ],
    [
      "Rule",
      "leftsub",
      "default",
      "[t] CSFordinalPosition; [t] \"Left Subscript\" (pause:200)",
      "self::*",
      "name(../..)=\"punctuated\"",
      "name(../../../..)=\"tensor\"",
      "../../@role=\"leftsub\""
    ],
    [
      "Rule",
      "leftsuper",
      "default",
      "[t] \"Left Superscript\" (pause:200)",
      "self::*",
      "name(../..)=\"tensor\"",
      "@role=\"leftsuper\""
    ],
    [
      "Rule",
      "leftsuper",
      "default",
      "[t] CSFordinalPosition; [t] \"Left Superscript\" (pause:200)",
      "self::*",
      "name(../..)=\"punctuated\"",
      "name(../../../..)=\"tensor\"",
      "../../@role=\"leftsuper\""
    ],
    [
      "Rule",
      "rightsub",
      "default",
      "[t] \"Right Subscript\" (pause:200)",
      "self::*",
      "name(../..)=\"tensor\"",
      "@role=\"rightsub\""
    ],
    [
      "Rule",
      "rightsub",
      "default",
      "[t] CSFordinalPosition; [t] \"Right Subscript\" (pause:200)",
      "self::*",
      "name(../..)=\"punctuated\"",
      "name(../../../..)=\"tensor\"",
      "../../@role=\"rightsub\""
    ],
    [
      "Rule",
      "rightsuper",
      "default",
      "[t] \"Right Superscript\" (pause:200)",
      "self::*",
      "name(../..)=\"tensor\"",
      "@role=\"rightsuper\""
    ],
    [
      "Rule",
      "rightsuper",
      "default",
      "[t] CSFordinalPosition; [t] \"Right Superscript\" (pause:200)",
      "self::*",
      "name(../..)=\"punctuated\"",
      "name(../../../..)=\"tensor\"",
      "../../@role=\"rightsuper\""
    ],
    [
      "Rule",
      "choice",
      "default",
      "[t] \"Choice Quantity\" (pause:200)",
      "self::line",
      "@role=\"binomial\"",
      "parent::*/parent::vector",
      "count(preceding-sibling::*)=0"
    ],
    [
      "Rule",
      "select",
      "default",
      "[t] \"Selection Quantity\" (pause:200)",
      "self::line",
      "@role=\"binomial\"",
      "parent::*/parent::vector",
      "count(preceding-sibling::*)=1"
    ],
    [
      "Rule",
      "row",
      "default",
      "[t] CSFordinalPosition; [t] \"Row\" (pause:200)",
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
      "[n] ../..; [t] CSFordinalPosition; [t] \"Column\" (pause:200)",
      "self::cell",
      "contains(@grammar,\"depth\")"
    ],
    [
      "Rule",
      "cell",
      "default",
      "[t] CSFordinalPosition; [t] \"Column\" (pause:200)",
      "self::cell"
    ]
  ]
}
