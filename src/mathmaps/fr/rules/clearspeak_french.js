{
  "locale": "fr",
  "domain": "clearspeak",
  "modality": "speech",
  "rules": [
    [
      "Rule",
      "collapsed",
      "default",
      "[n] . (engine:modality=summary,grammar:collapsed)",
      "self::*[@alternative]",
      "not(contains(@grammar, \"collapsed\"))"
    ],
    [
      "Rule",
      "direct-speech",
      "default",
      "[t] @ext-speech",
      "self::*[@ext-speech]"
    ],
    [
      "Rule",
      "stree",
      "default",
      "[n] ./*[1]",
      "self::stree"
    ],
    [
      "Rule",
      "unknown",
      "default",
      "[n] text()",
      "self::unknown"
    ],
    [
      "Rule",
      "protected",
      "default",
      "[n] text() (grammar:ignoreCaps=\"majuscule\")",
      "self::number",
      "contains(@grammar, \"protected\")"
    ],
    [
      "Rule",
      "omit-empty",
      "default",
      "[p] (pause:\"short\")",
      "self::empty"
    ],
    [
      "Rule",
      "font",
      "default",
      "[n] . (grammar:ignoreFont=@font);  [t] @font (grammar:localFont,pause:\"short\")",
      "self::*",
      "@font",
      "not(contains(@grammar, \"ignoreFont\"))",
      "@font!=\"normal\""
    ],
    [
      "Rule",
      "font-identifier",
      "default",
      "[n] . (grammar:ignoreFont=@font);  [t] @font (grammar:localFont,pause:\"short\")",
      "self::identifier",
      "string-length(text())=1",
      "@font",
      "@font=\"normal\"",
      "not(contains(@grammar, \"ignoreFont\"))",
      "@role!=\"unit\""
    ],
    [
      "Rule",
      "omit-font",
      "default",
      "[n] self::* (grammar:ignoreFont=@font)",
      "self::identifier",
      "string-length(text())=1",
      "@font",
      "not(contains(@grammar, \"ignoreFont\"))",
      "@font=\"italic\""
    ],
    [
      "Rule",
      "text",
      "default",
      "[n] text()",
      "self::text"
    ],
    [
      "Rule",
      "capital",
      "default",
      "[n] text() (pitch:0.6,grammar:ignoreCaps=\"majuscule\")",
      "self::identifier",
      "@role=\"latinletter\" or @role=\"greekletter\" or @role=\"simple function\"",
      "CQFisCapital"
    ],
    [
      "Rule",
      "capital",
      "Caps_SayCaps",
      "[n] text()",
      "self::identifier",
      "@role=\"latinletter\" or @role=\"greekletter\"",
      "CQFisCapital"
    ],
    [
      "Rule",
      "capital",
      "Caps_SayCaps",
      "[p] (pause:\"short\"); [n] text()",
      "self::identifier",
      "@role=\"latinletter\" or @role=\"greekletter\"",
      "CQFisCapital",
      "preceding-sibling::*[1]",
      "not(name(preceding-sibling::*[1])=\"function\")",
      "not(contains(@grammar, \"angle\"))"
    ],
    [
      "Rule",
      "capital",
      "Caps_SayCaps",
      "[n] text() (pause:\"short\")",
      "self::identifier",
      "@role=\"latinletter\" or @role=\"greekletter\"",
      "CQFisCapital",
      "following-sibling::*[1]"
    ],
    [
      "Rule",
      "capital",
      "Caps_SayCaps",
      "[p] (pause:\"short\"); [n] text() (pause:\"short\")",
      "self::identifier",
      "@role=\"latinletter\" or @role=\"greekletter\"",
      "CQFisCapital",
      "preceding-sibling::*[1]",
      "following-sibling::*[1]",
      "not(name(preceding-sibling::*[1])=\"function\")",
      "not(contains(@grammar, \"angle\"))"
    ],
    [
      "Rule",
      "punctuation-lr",
      "default",
      "[p] (pause:\"short\"); [n] text() (pause:\"short\")",
      "self::punctuation",
      "@role=\"comma\""
    ],
    [
      "Rule",
      "punctuation",
      "default",
      "[n] text()",
      "self::punctuation",
      "@role=\"comma\"",
      "not(preceding-sibling::*[1]/children)",
      "not(following-sibling::*[1]/children)"
    ],
    [
      "Rule",
      "punctuation-l",
      "default",
      "[p] (pause:\"short\"); [n] text()",
      "self::punctuation",
      "@role=\"comma\"",
      "not(following-sibling::*[1]/children)"
    ],
    [
      "Rule",
      "punctuation-r",
      "default",
      "[n] text() (pause:\"short\")",
      "self::punctuation",
      "@role=\"comma\"",
      "not(preceding-sibling::*[1]/children)"
    ],
    [
      "Rule",
      "ellipsis",
      "Ellipses_AndSoOn",
      "[t] \"et ainsi de suite\"",
      "self::punctuation",
      "@role=\"ellipsis\"",
      "not(following-sibling::*[1])",
      "not(preceding-sibling::*[last()][@role=\"ellipsis\"])"
    ],
    [
      "Rule",
      "ellipsis",
      "Ellipses_AndSoOn",
      "[t] \"et ainsi de suite jusqu'à\"",
      "self::punctuation",
      "@role=\"ellipsis\"",
      "preceding-sibling::*[1]",
      "following-sibling::*[1]"
    ],
    [
      "Rule",
      "vbar-evaluated",
      "default",
      "[n] children/*[1] (pause:\"short\"); [t] \"évalué à\"; [n] content/*[1]/children/*[2] (pause:\"short\")",
      "self::punctuated",
      "@role=\"endpunct\"",
      "content/*[1][@role=\"vbar\"]",
      "content/*[1][@embellished]",
      "name(content/*[1])=\"subscript\""
    ],
    [
      "Rule",
      "vbar-evaluated",
      "default",
      "[n] children/*[1] (pause:\"short\"); [t] \"évalué à\"; [n] content/*[1]/children/*[2] (pause:\"short\"); [t] \"moins la même expression évaluée à\"; [n] content/*[1]/children/*[1]/children/*[2] (pause:\"short\")",
      "self::punctuated",
      "@role=\"endpunct\"",
      "content/*[1][@role=\"vbar\"]",
      "content/*[1][@embellished]",
      "name(content/*[1])=\"superscript\"",
      "name(content/*[1]/children/*[1])=\"subscript\""
    ],
    [
      "Rule",
      "vbar-such-that",
      "VerticalLine_SuchThat",
      "[t] \"tel que\"",
      "self::punctuation",
      "@role=\"vbar\"",
      "not(parent::*/parent::*[@embellished=\"punctuation\"])"
    ],
    [
      "Rule",
      "vbar-divides",
      "default",
      "[t] \"diviseur de\"",
      "self::punctuation",
      "@role=\"vbar\"",
      "not(parent::*/parent::*[@embellished=\"punctuation\"])",
      "parent::*/parent::*[@role=\"sequence\"]"
    ],
    [
      "Rule",
      "vbar-divides",
      "VerticalLine_Divides",
      "[t] \"diviseur de\"",
      "self::punctuation",
      "@role=\"vbar\"",
      "not(parent::*/parent::*[@embellished=\"punctuation\"])"
    ],
    [
      "Rule",
      "vbar-given",
      "VerticalLine_Given",
      "[t] \"sachant\"",
      "self::punctuation",
      "@role=\"vbar\"",
      "not(parent::*/parent::*[@embellished=\"punctuation\"])"
    ],
    [
      "Rule",
      "set-member",
      "default",
      "[t] \"est un\"",
      "self::operator",
      "@role=\"set extended\"",
      "text()=\"∈\" or text()=\"∊\""
    ],
    [
      "SpecializedRule",
      "set-member",
      "default",
      "SetMemberSymbol_Member",
      "[t] \"appartient à\""
    ],
    [
      "SpecializedRule",
      "set-member",
      "default",
      "SetMemberSymbol_Element",
      "[t] \"est un élément de\""
    ],
    [
      "SpecializedRule",
      "set-member",
      "default",
      "SetMemberSymbol_Belongs",
      "[t] \"est dans\""
    ],
    [
      "Rule",
      "set-not-member",
      "default",
      "[t] \"n'est pas un\"",
      "self::operator",
      "@role=\"set extended\"",
      "text()=\"∉\""
    ],
    [
      "SpecializedRule",
      "set-not-member",
      "default",
      "SetMemberSymbol_Member",
      "[t] \"n'appartient pas à\""
    ],
    [
      "SpecializedRule",
      "set-not-member",
      "default",
      "SetMemberSymbol_Element",
      "[t] \"n'est pas un élément de\""
    ],
    [
      "SpecializedRule",
      "set-not-member",
      "default",
      "SetMemberSymbol_Belongs",
      "[t] \"n'est pas dans\""
    ],
    [
      "Rule",
      "prime",
      "default",
      "[n] children/*[1]; [n] children/*[2]",
      "self::superscript",
      "children/*[2]",
      "children/*[2][@role=\"prime\"]",
      "self::*"
    ],
    [
      "Rule",
      "degrees",
      "default",
      "[m] children/* (grammar:degree)",
      "self::punctuated[@role=\"sequence\"]",
      "content/*[1][@role=\"degree\"]"
    ],
    [
      "Rule",
      "feet",
      "default",
      "[n] children/*[1]; [t] \"ft\" (grammar:annotation=\"unit\":translate:plural)",
      "self::superscript",
      "children/*[2][@role=\"prime\"]",
      "name(children/*[1])=\"number\"",
      "children/*[2][text()=\"′\"]",
      "not(contains(@grammar, \"degree\"))"
    ],
    [
      "Rule",
      "foot",
      "default",
      "[n] children/*[1]; [t] \"ft\" (grammar:annotation=\"unit\":translate)",
      "self::superscript",
      "children/*[2][@role=\"prime\"]",
      "name(children/*[1])=\"number\"",
      "children/*[2][text()=\"′\"]",
      "children/*[1][text()=\"1\"]",
      "not(contains(@grammar, \"degree\"))"
    ],
    [
      "Rule",
      "inches",
      "default",
      "[n] children/*[1]; [t] \"in\" (grammar:annotation=\"unit\":translate:plural)",
      "self::superscript",
      "children/*[2][@role=\"prime\"]",
      "name(children/*[1])=\"number\"",
      "children/*[2][text()=\"″\"]",
      "not(contains(@grammar, \"degree\"))"
    ],
    [
      "Rule",
      "inch",
      "default",
      "[n] children/*[1]; [t] \"in\" (grammar:annotation=\"unit\":translate)",
      "self::superscript",
      "children/*[2][@role=\"prime\"]",
      "name(children/*[1])=\"number\"",
      "children/*[2][text()=\"″\"]",
      "children/*[1][text()=\"1\"]",
      "not(contains(@grammar, \"degree\"))"
    ],
    [
      "Rule",
      "minutes",
      "default",
      "[n] children/*[1]; [t] children/*[2]/text() (grammar:annotation=\"unit\":translate:plural)",
      "self::superscript",
      "children/*[2][@role=\"prime\"]",
      "children/*[2][text()=\"′\"]",
      "contains(@grammar, \"degree\")"
    ],
    [
      "Rule",
      "minute",
      "default",
      "[n] children/*[1]; [t] children/*[2]/text() (grammar:annotation=\"unit\":translate)",
      "self::superscript",
      "children/*[2][@role=\"prime\"]",
      "children/*[2][text()=\"′\"]",
      "contains(@grammar, \"degree\")",
      "children/*[1][text()=\"1\"]"
    ],
    [
      "Rule",
      "seconds",
      "default",
      "[n] children/*[1]; [t] children/*[2]/text() (grammar:annotation=\"unit\":translate:plural)",
      "self::superscript",
      "children/*[2][@role=\"prime\"]",
      "children/*[2][text()=\"″\"]",
      "contains(@grammar, \"degree\")"
    ],
    [
      "Rule",
      "second",
      "default",
      "[n] children/*[1]; [t] children/*[2]/text() (grammar:annotation=\"unit\":translate)",
      "self::superscript",
      "children/*[2][@role=\"prime\"]",
      "children/*[2][text()=\"″\"]",
      "contains(@grammar, \"degree\")",
      "children/*[1][text()=\"1\"]"
    ],
    [
      "Rule",
      "degrees-angle",
      "default",
      "[t] text() (grammar:annotation=\"unit\":translate:plural, pause:short)",
      "self::punctuation",
      "@role=\"degree\""
    ],
    [
      "Rule",
      "degree-angle",
      "default",
      "[t] text() (grammar:annotation=\"unit\":translate, pause:short)",
      "self::punctuation",
      "@role=\"degree\"",
      "preceding-sibling::*[text()=\"1\"]"
    ],
    [
      "Rule",
      "minutes-angle",
      "Prime_Angle",
      "[n] children/*[1]; [t] children/*[2]/text() (grammar:annotation=\"unit\":translate:plural)",
      "self::superscript",
      "children/*[2][@role=\"prime\"]",
      "children/*[2][text()=\"′\"]",
      "not(contains(@grammar, \"degree\"))",
      "name(children/*[1])=\"number\" or (children/*[1][@role=\"latinletter\"] and \"\"=translate(children/*[1]/text(),\"abcdefghijklmnopqrstuvwxyz\", \"\"))"
    ],
    [
      "Rule",
      "minute-angle",
      "Prime_Angle",
      "[n] children/*[1]; [t] children/*[2]/text() (grammar:annotation=\"unit\":translate)",
      "self::superscript",
      "children/*[2][@role=\"prime\"]",
      "children/*[2][text()=\"′\"]",
      "not(contains(@grammar, \"degree\"))",
      "children/*[1][text()=\"1\"]"
    ],
    [
      "Rule",
      "seconds-angle",
      "Prime_Angle",
      "[n] children/*[1]; [t] children/*[2]/text() (grammar:annotation=\"unit\":translate:plural)",
      "self::superscript",
      "children/*[2][@role=\"prime\"]",
      "children/*[2][text()=\"″\"]",
      "not(contains(@grammar, \"degree\"))",
      "name(children/*[1])=\"number\" or (children/*[1][@role=\"latinletter\"] and \"\"=translate(children/*[1]/text(),\"abcdefghijklmnopqrstuvwxyz\", \"\"))"
    ],
    [
      "Rule",
      "second-angle",
      "Prime_Angle",
      "[n] children/*[1]; [t] children/*[2]/text() (grammar:annotation=\"unit\":translate)",
      "self::superscript",
      "children/*[2][@role=\"prime\"]",
      "children/*[2][text()=\"″\"]",
      "not(contains(@grammar, \"degree\"))",
      "children/*[1][text()=\"1\"]"
    ],
    [
      "Rule",
      "feet-length",
      "Prime_Length",
      "[n] children/*[1]; [t] \"ft\" (grammar:annotation=\"unit\":translate:plural, pause:short)",
      "self::superscript",
      "children/*[2][@role=\"prime\"]",
      "children/*[2][text()=\"′\"]",
      "not(contains(@grammar, \"degree\"))",
      "name(children/*[1])=\"number\" or (children/*[1][@role=\"latinletter\"] and \"\"=translate(children/*[1]/text(),\"abcdefghijklmnopqrstuvwxyz\", \"\"))"
    ],
    [
      "Rule",
      "foot-length",
      "Prime_Length",
      "[n] children/*[1]; [t] \"ft\" (grammar:annotation=\"unit\":translate, pause:short)",
      "self::superscript",
      "children/*[2][@role=\"prime\"]",
      "children/*[2][text()=\"′\"]",
      "not(contains(@grammar, \"degree\"))",
      "children/*[1][text()=\"1\"]"
    ],
    [
      "Rule",
      "inches-length",
      "Prime_Length",
      "[n] children/*[1]; ; [t] \"in\" (grammar:annotation=\"unit\":translate:plural, pause:short)",
      "self::superscript",
      "children/*[2][@role=\"prime\"]",
      "children/*[2][text()=\"″\"]",
      "not(contains(@grammar, \"degree\"))",
      "name(children/*[1])=\"number\" or (children/*[1][@role=\"latinletter\"] and \"\"=translate(children/*[1]/text(),\"abcdefghijklmnopqrstuvwxyz\", \"\"))"
    ],
    [
      "Rule",
      "inch-length",
      "Prime_Length",
      "[n] children/*[1]; ; [t] \"in\" (grammar:annotation=\"unit\":translate, pause:short)",
      "self::superscript",
      "children/*[2][@role=\"prime\"]",
      "children/*[2][text()=\"″\"]",
      "not(contains(@grammar, \"degree\"))",
      "children/*[1][text()=\"1\"]"
    ],
    [
      "Rule",
      "punctuated",
      "default",
      "[m] children/*",
      "self::punctuated"
    ],
    [
      "Rule",
      "function",
      "default",
      "[n] text()",
      "self::function"
    ],
    [
      "Rule",
      "appl",
      "default",
      "[n] children/*[1]; [t] \"de\"; [n] children/*[2] (pause:\"short\")",
      "self::appl"
    ],
    [
      "Rule",
      "appl-simple",
      "default",
      "[n] children/*[1]; [t] \"de\" (pause:\"short\"); [n] children/*[2] (pause:\"short\")",
      "self::appl",
      "@role=\"simple function\"",
      "name(children/*[2])=\"appl\""
    ],
    [
      "Rule",
      "appl-simple",
      "default",
      "[n] children/*[1]; [t] \"de\" (pause:\"short\"); [n] children/*[2] (pause:\"short\")",
      "self::appl",
      "@role=\"simple function\"",
      "name(children/*[2])=\"fenced\"",
      "name(children/*[2]/children/*[1])=\"appl\""
    ],
    [
      "Rule",
      "appl",
      "Functions_None",
      "[p] (pause:\"short\"); [n] children/*[1]; [t] \"fois\"; [n] children/*[2] (pause:\"short\")",
      "self::appl"
    ],
    [
      "Rule",
      "function-prefix",
      "default",
      "[n] children/*[1]; [n] children/*[2]",
      "self::appl",
      "@role=\"prefix function\""
    ],
    [
      "Rule",
      "binary-operation",
      "ImpliedTimes_MoreImpliedTimes",
      "[n] . (grammar:impliedTimes, pause:\"short\")",
      "self::appl",
      "@role=\"prefix function\"",
      "parent::*/parent::infixop[@role=\"implicit\"]",
      "following-sibling::*",
      "not(contains(@grammar, \"impliedTimes\"))"
    ],
    [
      "Rule",
      "function-prefix-simple-arg",
      "default",
      "[n] children/*[1]; [n] children/*[2]",
      "self::appl",
      "@role=\"prefix function\"",
      "name(children/*[2])=\"fenced\"",
      "contains(children/*[2]/children/*[1]/@annotation, \"clearspeak:simple\")",
      "name(children/*[2]/children/*[1])!=\"number\"",
      "name(children/*[2]/children/*[1])!=\"identifier\"",
      "name(children/*[2]/children/*[1])!=\"appl\""
    ],
    [
      "Rule",
      "function-prefix-embell",
      "default",
      "[p] (pause:\"short\"); [n] children/*[1]; [n] children/*[2] (pause:\"short\"); ",
      "self::appl",
      "@role=\"prefix function\"",
      "name(children/*[1])!=\"function\""
    ],
    [
      "Rule",
      "function-prefix-fenced-or-frac-arg",
      "default",
      "[p] (pause:\"short\"); [n] children/*[1]; [t] \"de\"; [n] children/*[2] (pause:\"short\")",
      "self::appl",
      "@role=\"prefix function\"",
      "(name(children/*[2])=\"fenced\" and not(contains(children/*[2]/children/*[1]/@annotation, \"clearspeak:simple\"))) or name(children/*[2])=\"fraction\" or (name(children/*[2])!=\"fenced\" and not(contains(children/*[2]/@annotation, \"clearspeak:simple\")))",
      "self::*"
    ],
    [
      "Rule",
      "function-prefix-subscript",
      "default",
      "[p] (pause:\"short\"); [n] children/*[1]; [t] \"de\" (pause:\"short\"); [n] children/*[2] (pause:\"short\")",
      "self::appl",
      "@role=\"prefix function\"",
      "name(children/*[1])=\"subscript\"",
      "self::*"
    ],
    [
      "Rule",
      "function-ln",
      "default",
      "[n] children/*[1]; [n] children/*[2]",
      "self::appl",
      "@role=\"prefix function\"",
      "content/*[2][text()=\"ln\"]",
      "not(following-sibling::*)",
      "not(contains(@grammar, \"NatLog\"))"
    ],
    [
      "Rule",
      "function-ln",
      "default",
      "[n] children/*[1]; [n] children/*[2] (pause:\"short\")",
      "self::appl",
      "@role=\"prefix function\"",
      "content/*[2][text()=\"ln\"]",
      "not(contains(@grammar, \"NatLog\"))"
    ],
    [
      "Rule",
      "function-ln",
      "default",
      "[n] children/*[1]; [t] \"de\"; [n] children/*[2] (pause:\"short\")",
      "self::appl",
      "@role=\"prefix function\"",
      "content/*[2][text()=\"ln\"]",
      "name(children/*[2])=\"fenced\"",
      "not(contains(@grammar, \"NatLog\"))"
    ],
    [
      "Rule",
      "function-ln",
      "Log_LnAsNaturalLog",
      "[n] . (grammar:NatLog)",
      "self::appl",
      "@role=\"prefix function\"",
      "content/*[2][text()=\"ln\"]",
      "not(following-sibling::*)",
      "not(contains(@grammar, \"NatLog\"))"
    ],
    [
      "Rule",
      "function-ln",
      "Log_LnAsNaturalLog",
      "[n] . (grammar:NatLog, pause:\"short\")",
      "self::appl",
      "@role=\"prefix function\"",
      "content/*[2][text()=\"ln\"]",
      "not(contains(@grammar, \"NatLog\"))"
    ],
    [
      "Rule",
      "function-prefix-as-exp",
      "default",
      "[n] children/*[1]; [t] \"de\" (pause:\"short\"); [n] children/*[2] (pause:\"short\")",
      "self::appl",
      "@role=\"prefix function\"",
      "name(parent::*/parent::*)=\"superscript\"",
      "not(following-sibling::*)",
      "(name(children/*[2])=\"fenced\" and not(contains(children/*[2]/children/*[1]/@annotation, \"clearspeak:simple\"))) or name(children/*[2])=\"fraction\" or (name(children/*[2])!=\"fenced\" and not(contains(children/*[2]/@annotation, \"clearspeak:simple\")))"
    ],
    [
      "Rule",
      "function-prefix-subscript-as-exp",
      "default",
      "[n] children/*[1]; [t] \"de\" (pause:\"short\"); [n] children/*[2] (pause:\"short\")",
      "self::appl",
      "@role=\"prefix function\"",
      "name(parent::*/parent::*)=\"superscript\"",
      "not(following-sibling::*)",
      "name(children/*[1])=\"subscript\""
    ],
    [
      "Rule",
      "function-prefix-hyper",
      "default",
      "[p] (pause:\"short\"); [n] children/*[1]; [t] \"de\"; [n] children/*[2] (pause:\"short\")",
      "self::appl",
      "@role=\"prefix function\"",
      "CQFisHyperbolic"
    ],
    [
      "Rule",
      "function-prefix-inverse",
      "default",
      "[p] (pause:\"short\");  [n] children/*[1]/children/*[1]; [t] \"inverse de\"; [n] children/*[2] (pause:\"short\")",
      "self::appl",
      "@role=\"prefix function\"",
      "name(children/*[1])=\"superscript\"",
      "name(children/*[1]/children/*[2])=\"prefixop\"",
      "children/*[1]/children/*[2][@role=\"negative\"]",
      "children/*[1]/children/*[2]/children/*[1][text()=\"1\"]",
      "not(contains(@grammar, \"functions_none\"))"
    ],
    [
      "Rule",
      "function-prefix-inverse",
      "Trig_Reciprocal",
      "[p] (pause:\"short\"); [t] \"la reciproque de\"; [n] children/*[1]/children/*[1] (pause:\"short\"); [n] children/*[2] (pause:\"short\")",
      "self::appl",
      "@role=\"prefix function\"",
      "name(children/*[1])=\"superscript\"",
      "name(children/*[1]/children/*[2])=\"prefixop\"",
      "children/*[1]/children/*[2][@role=\"negative\"]",
      "children/*[1]/children/*[2]/children/*[1][text()=\"1\"]",
      "not(contains(@grammar, \"functions_none\"))"
    ],
    [
      "Rule",
      "function-prefix-inverse",
      "Trig_Reciprocal",
      "[p] (pause:\"short\"); [t] \"la reciproque de\"; [n] children/*[1]/children/*[1];[n] children/*[2] (pause:\"short\")",
      "self::appl",
      "@role=\"prefix function\"",
      "name(children/*[1])=\"superscript\"",
      "name(children/*[1]/children/*[2])=\"prefixop\"",
      "contains(children/*[2]/@annotation, \"clearspeak:simple\")",
      "children/*[1]/children/*[2][@role=\"negative\"]",
      "children/*[1]/children/*[2]/children/*[1][text()=\"1\"]",
      "not(contains(@grammar, \"functions_none\"))"
    ],
    [
      "Rule",
      "appl-triginverse",
      "Trig_TrigInverse",
      "[p] (pause:\"short\"); [n] children/*[1]; [t] \"de\"; [n] children/*[2] (pause:\"short\")",
      "self::appl",
      "@role=\"prefix function\"",
      "name(children/*[1])=\"superscript\"",
      "name(children/*[1]/children/*[2])=\"prefixop\"",
      "children/*[1]/children/*[2][@role=\"negative\"]",
      "children/*[1]/children/*[2]/children/*[1][text()=\"1\"]"
    ],
    [
      "Rule",
      "function-prefix-arc-simple",
      "Trig_ArcTrig",
      "[p] (pause:\"short\"); [t] \"arc\"; [n] children/*[1]/children/*[1]; [n] children/*[2] (pause:\"short\")",
      "self::appl",
      "@role=\"prefix function\"",
      "name(children/*[1])=\"superscript\"",
      "name(children/*[1]/children/*[2])=\"prefixop\"",
      "children/*[1]/children/*[2][@role=\"negative\"]",
      "children/*[1]/children/*[2]/children/*[1][text()=\"1\"]",
      "not(contains(@grammar, \"functions_none\"))"
    ],
    [
      "Rule",
      "function-prefix-arc-simple",
      "Trig_ArcTrig",
      "[p] (pause:\"short\"); [t] \"arc\"; [n] children/*[1]/children/*[1] (pause:\"short\"); [n] children/*[2] (pause:\"short\")",
      "self::appl",
      "@role=\"prefix function\"",
      "name(children/*[1])=\"superscript\"",
      "name(children/*[1]/children/*[2])=\"prefixop\"",
      "children/*[1]/children/*[2][@role=\"negative\"]",
      "children/*[1]/children/*[2]/children/*[1][text()=\"1\"]",
      "name(children/*[2])=\"fenced\"",
      "children/*[2]/children/*[1][@role=\"prefix function\"]",
      "contains(children/*[2]/children/*[1]/@annotation, \"clearspeak:simple\")",
      "not(contains(@grammar, \"functions_none\"))"
    ],
    [
      "Rule",
      "function-prefix-arc",
      "Trig_ArcTrig",
      "[p] (pause:\"short\"); [t] \"arc\"; [n] children/*[1]/children/*[1]; [t] \"de\"; [n] children/*[2] (pause:\"short\")",
      "self::appl",
      "@role=\"prefix function\"",
      "name(children/*[1])=\"superscript\"",
      "name(children/*[1]/children/*[2])=\"prefixop\"",
      "children/*[1]/children/*[2][@role=\"negative\"]",
      "children/*[1]/children/*[2]/children/*[1][text()=\"1\"]",
      "not(contains(@grammar, \"functions_none\"))",
      "(name(children/*[2])=\"fenced\" and not(contains(children/*[2]/children/*[1]/@annotation, \"clearspeak:simple\"))) or (name(children/*[2])=\"fraction\" and children/*[2][@role!=\"vulgar\"])"
    ],
    [
      "Rule",
      "function-inverse",
      "default",
      "[n] children/*[1]; [t] \"inverse\"",
      "self::superscript",
      "@role=\"prefix function\" or @role=\"simple function\"",
      "name(children/*[2])=\"prefixop\"",
      "children/*[2][@role=\"negative\"]",
      "children/*[2]/children/*[1][text()=\"1\"]",
      "not(contains(@grammar, \"functions_none\"))"
    ],
    [
      "Rule",
      "function-inverse",
      "Functions_Reciprocal",
      "[t] \"la reciproque de\"; [n] children/*[1]",
      "self::superscript",
      "@role=\"prefix function\" or @role=\"simple function\"",
      "name(children/*[2])=\"prefixop\"",
      "children/*[2][@role=\"negative\"]",
      "children/*[2]/children/*[1][text()=\"1\"]",
      "not(contains(@grammar, \"functions_none\"))"
    ],
    [
      "Rule",
      "function-inverse",
      "Functions_None",
      "[n] . (grammar:functions_none)",
      "self::superscript",
      "@role=\"prefix function\" or @role=\"simple function\"",
      "name(children/*[2])=\"prefixop\"",
      "children/*[2][@role=\"negative\"]",
      "children/*[2]/children/*[1][text()=\"1\"]",
      "not(contains(@grammar, \"functions_none\"))"
    ],
    [
      "Rule",
      "superscript",
      "default",
      "[n] children/*[1]; [t] \"à l'exposant\" (pause:\"short\"); [n] children/*[2] (pause:\"short\"); [t] \"fin exposant\" (pause:\"short\")",
      "self::superscript"
    ],
    [
      "Rule",
      "superscript-simple-exponent",
      "default",
      "[n] children/*[1]; [t] \"à la puissance\"; [n] children/*[2] (pause:\"medium\")",
      "self::superscript",
      "not(descendant::superscript)"
    ],
    [
      "Rule",
      "superscript-simple-exponent-end",
      "default",
      "[n] children/*[1]; [t] \"à la puissance\"; [n] children/*[2] (pause:\"medium\")",
      "self::superscript",
      "not(descendant::superscript)",
      "not(following-sibling::*)"
    ],
    [
      "Aliases",
      "superscript-simple-exponent",
      "self::superscript",
      "children/superscript/children/*[2][text()=\"2\"] or children/superscript/children/*[2][text()=\"3\"]",
      "name(children/superscript/children/*[1])=\"number\"",
      "contains(children/superscript/children/*[1]/@annotation, \"clearspeak:simple\")"
    ],
    [
      "Aliases",
      "superscript-simple-exponent",
      "self::superscript",
      "children/superscript/children/*[2][text()=\"2\"] or children/superscript/children/*[2][text()=\"3\"]",
      "name(children/superscript/children/*[1])=\"fraction\"",
      "contains(children/superscript/children/*[1]/@annotation, \"clearspeak:simple\")"
    ],
    [
      "Aliases",
      "superscript-simple-exponent",
      "self::superscript",
      "children/superscript/children/*[2][text()=\"2\"] or children/superscript/children/*[2][text()=\"3\"]",
      "name(children/superscript/children/*[1])=\"identifier\""
    ],
    [
      "Aliases",
      "superscript-simple-exponent",
      "self::superscript",
      "children/*[2][@role=\"implicit\"]",
      "count(children/*[2]/children/*)=2",
      "contains(children/*[2]/children/*[1]/@annotation, \"simple\")",
      "name(children/*[2]/children/*[2])=\"superscript\"",
      "(name(children/*[2]/children/*[2]/children/*[1])=\"number\" and contains(children/*[2]/children/*[2]/children/*[1]/@annotation, \"clearspeak:simple\")) or name(children/*[2]/children/*[2]/children/*[1])=\"identifier\"",
      "children/*[2]/children/*[2]/children/*[2][text()=\"2\"] or children/*[2]/children/*[2]/children/*[2][text()=\"3\"]"
    ],
    [
      "Rule",
      "superscript-simple-function",
      "Functions_None",
      "[n] . (grammar:functions_none)",
      "self::superscript",
      "name(children/*[1])=\"identifier\"",
      "children/*[1][@role=\"simple function\"]",
      "not(contains(@grammar, \"functions_none\"))"
    ],
    [
      "Rule",
      "superscript-ordinal",
      "Exponent_Ordinal",
      "[n] children/*[1]; [t] \"à la\"; [n] children/*[2] (grammar:ordinal); [t] \"puissance\" (pause:\"medium\")",
      "self::superscript",
      "name(children/*[2])=\"identifier\"",
      "children/*[2][@role=\"latinletter\"]"
    ],
    [
      "Rule",
      "superscript-ordinal",
      "Exponent_Ordinal",
      "[n] children/*[1]; [t] \"à la puissance\"; [n] children/*[2] (pause:\"medium\")",
      "self::superscript",
      "name(children/*[2])=\"identifier\"",
      "children/*[2][@role=\"latinletter\"]",
      "CQFisCaptial"
    ],
    [
      "Rule",
      "exponent",
      "default",
      "[n] text() (join:\"-\"); [t] \"ième\"",
      "self::identifier",
      "contains(@grammar, \"ordinal\")"
    ],
    [
      "Rule",
      "exponent",
      "default",
      "[t] CSFordinalExponent",
      "self::number",
      "@role=\"integer\"",
      "contains(@grammar, \"ordinal\")",
      "text()!=\"0\""
    ],
    [
      "Rule",
      "exponent",
      "Exponent_Ordinal",
      "[t] CSFwordOrdinal",
      "self::number",
      "@role=\"integer\"",
      "contains(@grammar, \"ordinal\")",
      "text()!=\"0\""
    ],
    [
      "Rule",
      "exponent",
      "Exponent_Ordinal",
      "[t] \"zero\"",
      "self::number",
      "@role=\"integer\"",
      "contains(@grammar, \"ordinal\")",
      "text()=\"0\""
    ],
    [
      "Rule",
      "exponent",
      "Exponent_OrdinalPower",
      "[t] CSFwordOrdinal",
      "self::number",
      "@role=\"integer\"",
      "contains(@grammar, \"ordinal\")",
      "text()!=\"0\""
    ],
    [
      "Rule",
      "exponent",
      "Exponent_OrdinalPower",
      "[t] \"zero\"",
      "self::number",
      "@role=\"integer\"",
      "contains(@grammar, \"ordinal\")",
      "text()=\"0\""
    ],
    [
      "Rule",
      "square",
      "default",
      "[n] children/*[1]; [t] \"au carré\"",
      "self::superscript",
      "children/*[2][text()=\"2\"]",
      "name(children/*[1])!=\"text\" or not(name(children/*[1])=\"text\" and (name(../../../punctuated[@role=\"text\"]/..)=\"stree\" or name(..)=\"stree\"))",
      "self::*",
      "self::*"
    ],
    [
      "Rule",
      "cube",
      "default",
      "[n] children/*[1]; [t] \"au cube\"",
      "self::superscript",
      "children/*[2][text()=\"3\"]",
      "name(children/*[1])!=\"text\" or not(name(children/*[1])=\"text\" and (name(../../../punctuated[@role=\"text\"]/..)=\"stree\" or name(..)=\"stree\"))",
      "self::*",
      "self::*"
    ],
    [
      "Rule",
      "paren-simple",
      "default",
      "[n] children/*[1]",
      "self::fenced",
      "@role=\"leftright\"",
      "contains(children/*[1]/@annotation, \"clearspeak:simple\")",
      "name(../..)!=\"superscript\" and name(../..)!=\"subscript\""
    ],
    [
      "Rule",
      "paren-simple-exp",
      "default",
      "[n] children/*[1]",
      "self::fenced",
      "@role=\"leftright\"",
      "name(../..)=\"superscript\"",
      "children/*[1][@role=\"integer\"] or children/*[1][@role=\"float\"] or (children/*[1][@role=\"vulgar\"] and contains(children/*[1]/@annotation, \"clearspeak:simple\")) or children/*[1][@role=\"latinletter\"] or children/*[1][@role=\"greekletter\"] or children/*[1][@role=\"otherletter\"]"
    ],
    [
      "Rule",
      "paren-simple-nested-func",
      "default",
      "[n] children/*[1]",
      "self::fenced",
      "@role=\"leftright\"",
      "name(../*[1])=\"identifier\" or name(../*[1])=\"function\"",
      "parent::*/parent::*[@role=\"simple function\" or @role=\"prefix function\"]",
      "children/*[1][@role=\"simple function\" or @role=\"prefix function\"]",
      "contains(children/*[1]/children/*[2]/children/*[1]/@annotation, \"clearspeak:simple\") or name(children/*[1]/children/*[2]/children/*[1])=\"subscript\" or name(children/*[1]/children/*[2]/children/*[1])=\"superscript\" or children/*[1]/children/*[2]/children/*[1][@role=\"vulgar\"] "
    ],
    [
      "Rule",
      "paren-simple-nested-func-no-bracket",
      "Functions_None",
      "[n] children/*[1];",
      "self::fenced",
      "@role=\"leftright\"",
      "name(../*[1])=\"identifier\" or name(../*[1])=\"function\"",
      "parent::*/parent::*[@role=\"simple function\" or @role=\"prefix function\"]",
      "children/*[1][@role=\"simple function\" or @role=\"prefix function\"]",
      "name(children/*[1]/children/*[1])=\"identifier\" or name(children/*[1]/children/*[1])=\"function\"",
      "contains(children/*[1]/children/*[2]/children/*[1]/@annotation, \"clearspeak:simple\")",
      "name(children/*[1]/children/*[2]/children/*[1])=\"identifier\" or name(children/*[1]/children/*[2]/children/*[1])=\"number\""
    ],
    [
      "Rule",
      "fences-open-close",
      "default",
      "[p] (pause:\"short\"); [n] content/*[1] (grammar:spokenFence, pause:\"short\"); [n] children/*[1] (pause:\"short\"); [n] content/*[2] (grammar:spokenFence, pause:\"short\")",
      "self::fenced",
      "@role=\"leftright\""
    ],
    [
      "Rule",
      "paren-simple-nested-func",
      "default",
      "[p] (pause:\"short\"); [n] content/*[1] (pause:\"short\"); [n] children/*[1] (pause:\"short\"); [n] content/*[2] (pause:\"short\")",
      "self::fenced",
      "@role=\"leftright\"",
      "name(../*[1])=\"identifier\" or name(../*[1])=\"function\"",
      "parent::*/parent::*[@role=\"simple function\" or @role=\"prefix function\"]",
      "not(contains(children/*[1]/@annotation, \"clearspeak:simple\"))"
    ],
    [
      "Rule",
      "paren-simple-nested-func",
      "Functions_None",
      "[p] (pause:\"short\"); [n] content/*[1] (grammar:spokenFence, pause:\"short\"); [n] children/*[1] (pause:\"short\"); [n] content/*[2] (grammar:spokenFence, pause:\"short\")",
      "self::fenced",
      "@role=\"leftright\"",
      "name(../*[1])=\"identifier\" or name(../*[1])=\"function\"",
      "parent::*/parent::*[@role=\"simple function\" or @role=\"prefix function\"]",
      "children/*[1][@role=\"simple function\" or @role=\"prefix function\"]",
      "contains(children/*[1]/children/*[2]/children/*[1]/@annotation, \"clearspeak:simple\") or name(children/*[1]/children/*[2]/children/*[1])=\"subscript\" or name(children/*[1]/children/*[2]/children/*[1])=\"superscript\" or children/*[1]/children/*[2]/children/*[1][@role=\"vulgar\"] "
    ],
    [
      "SpecializedRule",
      "fences-open-close",
      "default",
      "Paren_Speak"
    ],
    [
      "Aliases",
      "fences-open-close",
      "self::fenced",
      "@role=\"composed function\""
    ],
    [
      "Rule",
      "fence-silent",
      "Paren_Silent",
      "[p] (pause:\"short\"); [n] children/*[1] (pause:\"short\")",
      "self::fenced"
    ],
    [
      "Rule",
      "fences-open-close",
      "ImpliedTimes_None",
      "[p] (pause:\"short\"); [n] content/*[1] (grammar:spokenFence, pause:\"short\"); [n] children/*[1] (pause:\"short\"); [n] content/*[2] (grammar:spokenFence, pause:\"short\")",
      "self::fenced",
      "@role=\"leftright\"",
      "parent::*/parent::*[@role!=\"simple function\"]",
      "parent::*/parent::*[@role!=\"prefix function\"]"
    ],
    [
      "Rule",
      "fence-nesting",
      "Paren_SpeakNestingLevel",
      "[n] text() (grammar:insertNesting=CSFnestingDepth)",
      "self::fence",
      "contains(@grammar, \"spokenFence\")",
      "CQFmatchingFences"
    ],
    [
      "Rule",
      "fence-no-nesting",
      "Paren_SpeakNestingLevel",
      "[n] text()",
      "self::fence"
    ],
    [
      "Rule",
      "fences-points",
      "Paren_CoordPoint",
      "[t] \"le point avec coordonées\"; [n] children/*[1]",
      "self::fenced",
      "name(children/*[1])=\"punctuated\"",
      "children/*[1][@role=\"sequence\"]"
    ],
    [
      "Rule",
      "fences-interval",
      "Paren_Interval",
      "[t] \"un intervalle de\"; [n] children/*[1]/children/*[1]; [t] \"à\"; [n] children/*[1]/children/*[3] (pause:\"short\"); [n] . (grammar:interval)",
      "self::fenced",
      "not(contains(@grammar, \"interval\"))",
      "name(children/*[1])=\"punctuated\"",
      "children/*[1][@role=\"sequence\"]",
      "count(./children/*[1]/content/*)=1",
      "children/*[1]/content/*[1][@role=\"comma\"]"
    ],
    [
      "Rule",
      "interval-open",
      "Paren_Interval",
      "[t] \"sans inclure\"; [n] children/*[1]/children/*[1]; [t] \"ni\"; [n] children/*[1]/children/*[3]",
      "self::fenced",
      "contains(@grammar, \"interval\")",
      "content/*[1]/text()=\"(\"",
      "content/*[2]/text()=\")\""
    ],
    [
      "Rule",
      "interval-closed-open",
      "Paren_Interval",
      "[t] \"avec\"; [n] children/*[1]/children/*[1]; [t] \"inclus\" (pause:\"short\"); [t] \"mais sans inclure\"; [n] children/*[1]/children/*[3]",
      "self::fenced",
      "contains(@grammar, \"interval\")",
      "content/*[1]/text()=\"[\"",
      "content/*[2]/text()=\")\""
    ],
    [
      "Rule",
      "interval-open-closed",
      "Paren_Interval",
      "[t] \"sans inclure\"; [n] children/*[1]/children/*[1] (pause:\"short\"); [t] \"mais avec\"; [n] children/*[1]/children/*[3]; [t] \"inclus\"",
      "self::fenced",
      "contains(@grammar, \"interval\")",
      "content/*[1]/text()=\"(\"",
      "content/*[2]/text()=\"]\""
    ],
    [
      "Rule",
      "interval-closed",
      "Paren_Interval",
      "[t] \"avec\"; [n] children/*[1]/children/*[1]; [t] \"et\"; [n] children/*[1]/children/*[3]; [t] \"inclus\"",
      "self::fenced",
      "contains(@grammar, \"interval\")",
      "content/*[1]/text()=\"[\"",
      "content/*[2]/text()=\"]\""
    ],
    [
      "Rule",
      "interval-open-inf-r",
      "Paren_Interval",
      "[t] \"sans inclure\"; [n] children/*[1]/children/*[1]",
      "self::fenced",
      "contains(@grammar, \"interval\")",
      "content/*[1]/text()=\"(\"",
      "content/*[2]/text()=\")\"",
      "children/*[1]/children/*[3]/text()=\"∞\" or (name(children/*[1]/children/*[3])=\"prefixop\" and children/*[1]/children/*[3]/children/*[1]/text()=\"∞\")"
    ],
    [
      "Rule",
      "interval-open-inf-l",
      "Paren_Interval",
      "[t] \"sans inclure\"; [n] children/*[1]/children/*[3]",
      "self::fenced",
      "contains(@grammar, \"interval\")",
      "content/*[1]/text()=\"(\"",
      "content/*[2]/text()=\")\"",
      "children/*[1]/children/*[1]/text()=\"∞\" or (name(children/*[1]/children/*[1])=\"prefixop\" and children/*[1]/children/*[1]/children/*[1]/text()=\"∞\")"
    ],
    [
      "Rule",
      "interval-open-inf-lr",
      "Paren_Interval",
      "",
      "self::fenced",
      "contains(@grammar, \"interval\")",
      "content/*[1]/text()=\"(\"",
      "content/*[2]/text()=\")\"",
      "children/*[1]/children/*[3]/text()=\"∞\" or (name(children/*[1]/children/*[3])=\"prefixop\" and children/*[1]/children/*[3]/children/*[1]/text()=\"∞\")",
      "children/*[1]/children/*[1]/text()=\"∞\" or (name(children/*[1]/children/*[1])=\"prefixop\" and children/*[1]/children/*[1]/children/*[1]/text()=\"∞\")"
    ],
    [
      "Rule",
      "interval-closed-open-inf",
      "Paren_Interval",
      "[t] \"avec\"; [n] children/*[1]/children/*[1]; [t] \"inclus\"",
      "self::fenced",
      "contains(@grammar, \"interval\")",
      "content/*[1]/text()=\"[\"",
      "content/*[2]/text()=\")\"",
      "children/*[1]/children/*[3]/text()=\"∞\" or (name(children/*[1]/children/*[3])=\"prefixop\" and children/*[1]/children/*[3]/children/*[1]/text()=\"∞\")"
    ],
    [
      "Rule",
      "interval-open-closed-inf",
      "Paren_Interval",
      "[t] \"avec\"; [n] children/*[1]/children/*[3]; [t] \"inclus\"",
      "self::fenced",
      "contains(@grammar, \"interval\")",
      "content/*[1]/text()=\"(\"",
      "content/*[2]/text()=\"]\"",
      "children/*[1]/children/*[1]/text()=\"∞\" or (name(children/*[1]/children/*[1])=\"prefixop\" and children/*[1]/children/*[1]/children/*[1]/text()=\"∞\")"
    ],
    [
      "Rule",
      "paren-nested-embellished-funcs",
      "Functions_None",
      "[p] (pause:\"short\"); [n] content/*[1] (pause:\"short\"); [n] children/*[1] (pause:\"short\"); [n] content/*[2] (pause:\"short\")",
      "self::fenced",
      "@role=\"leftright\"",
      "name(../..)=\"appl\"",
      "name(children/*[1]) = \"appl\"",
      "preceding-sibling::*/descendant-or-self::*[@role=\"subsup\"] or children/*[1]/descendant-or-self::*[@role=\"subsup\"]"
    ],
    [
      "Rule",
      "set-empty",
      "default",
      "[t] \"ensemble vide\"",
      "self::fenced",
      "@role=\"set empty\""
    ],
    [
      "Rule",
      "set-extended",
      "default",
      "[t] \"ensemble des\"; [n] children/*[1]/children/*[1]; [t] \"tel que\"; [n] children/*[1]/children/*[3]",
      "self::fenced",
      "@role=\"set extended\""
    ],
    [
      "Rule",
      "set-collection",
      "default",
      "[t] \"ensemble\"; [n] children/*[1]",
      "self::fenced",
      "@role=\"set collection\""
    ],
    [
      "Aliases",
      "set-collection",
      "self::fenced",
      "@role=\"set singleton\""
    ],
    [
      "Rule",
      "set-extended",
      "Sets_woAll",
      "[t] \"ensemble de\"; [n] children/*[1]/children/*[1]; [t] \"tel que\"; [n] children/*[1]/children/*[3]",
      "self::fenced",
      "@role=\"set extended\""
    ],
    [
      "Rule",
      "set-collection",
      "Sets_SilentBracket",
      "[n] children/*[1]",
      "self::fenced",
      "@role=\"set collection\""
    ],
    [
      "Rule",
      "subscript",
      "default",
      "[p] (pause:short); [n] children/*[1]; [t] \"sub\"; [n] children/*[2] (pause:short)",
      "self::subscript"
    ],
    [
      "Rule",
      "subscript-base",
      "default",
      "[n] children/*[1]; [t] \"base\"; [n] children/*[2]",
      "self::subscript",
      "CQFisLogarithm"
    ],
    [
      "Rule",
      "subscript-index",
      "default",
      "[n] children/*[1]; [t] \"sub\"; [n] children/*[2]",
      "self::subscript",
      "contains(@grammar, \"simpleDet\")"
    ],
    [
      "Rule",
      "fraction",
      "default",
      "[p] (pause:short); [t] \"fraction avec numérateur\"; [n] children/*[1] (pause:short); [t] \"et dénominateur\"; [n] children/*[2] (pause:short)",
      "self::fraction"
    ],
    [
      "Rule",
      "fraction",
      "Functions_None",
      "[p] (pause:short); [t] \"fraction avec numérateur\"; [n] children/*[1] (pause:short); [t] \"et dénominateur\"; [n] children/*[2] (pause:short)",
      "self::fraction",
      "name(children/*[1])=\"appl\" or name(children/*[2])=\"appl\""
    ],
    [
      "Rule",
      "simple-fraction",
      "default",
      "[p] (pause:short); [n] children/*[1]; [t] \"sur\"; [n] children/*[2] (pause:short)",
      "self::fraction",
      "contains(children/*[1]/@annotation, \"clearspeak:simple\") or contains(children/*[1]/@annotation, \"clearspeak:unit\")",
      "contains(children/*[2]/@annotation, \"clearspeak:simple\") or contains(children/*[2]/@annotation, \"clearspeak:unit\")"
    ],
    [
      "Rule",
      "simple-vulgar-fraction",
      "default",
      "[p] (pause:short); [n] children/*[1]; [t] \"sur\"; [n] children/*[2] (pause:short)",
      "self::fraction",
      "@role=\"vulgar\""
    ],
    [
      "Rule",
      "simple-text-fraction",
      "default",
      "[p] (pause:short); [n] children/*[1]; [t] \"sur\"; [n] children/*[2] (pause:short)",
      "self::fraction",
      "name(children/*[1])=\"text\"",
      "name(children/*[2])=\"text\""
    ],
    [
      "Rule",
      "simple-text-fraction",
      "default",
      "[p] (pause:short); [n] children/*[1]; [t] \"sur\"; [n] children/*[2] (pause:short)",
      "self::fraction",
      "name(children/*[1])=\"infixop\"",
      "children/*[1][@role=\"unit\"]",
      "name(children/*[2])=\"text\""
    ],
    [
      "Rule",
      "vulgar-fraction",
      "default",
      "[t] CSFvulgarFraction",
      "self::fraction",
      "@role=\"vulgar\"",
      "CQFvulgarFractionSmall"
    ],
    [
      "Rule",
      "fraction",
      "Fraction_Over",
      "[p] (pause:short); [n] children/*[1]; [t] \"sur\"; [n] children/*[2] (pause:short)",
      "self::fraction"
    ],
    [
      "Rule",
      "fraction",
      "Fraction_OverEndFrac",
      "[p] (pause:short); [n] children/*[1]; [t] \"sur\"; [n] children/*[2] (pause:short); [t] \"fin fraction\" (pause:short)",
      "self::fraction"
    ],
    [
      "Rule",
      "fraction",
      "Fraction_FracOver",
      "[p] (pause:short); [t] \"fraction\"; [n] children/*[1]; [t] \"sur\"; [n] children/*[2] (pause:short)",
      "self::fraction"
    ],
    [
      "Rule",
      "fraction",
      "Fraction_Per",
      "[p] (pause:short); [n] children/*[1]; [t] \"par\"; [n] children/*[2] (pause:short)",
      "self::fraction"
    ],
    [
      "Rule",
      "fraction",
      "Fraction_GeneralEndFrac",
      "[p] (pause:short); [t] \"fraction avec numérateur\"; [n] children/*[1] (pause:short); [t] \"et dénominateur\"; [n] children/*[2] (pause:short); [t] \"fin fraction\" (pause:short)",
      "self::fraction"
    ],
    [
      "Rule",
      "fraction",
      "Fraction_General",
      "[p] (pause:short); [t] \"fraction avec numérateur\"; [n] children/*[1] (pause:short); [t] \"et dénominateur\"; [n] children/*[2] (pause:short)",
      "self::fraction"
    ],
    [
      "Rule",
      "simple-vulgar-fraction",
      "Fraction_Ordinal",
      "[t] CSFvulgarFraction",
      "self::fraction",
      "@role=\"vulgar\""
    ],
    [
      "Rule",
      "fraction",
      "Fraction_EndFrac",
      "[p] (pause:short); [n] . (grammar:endfrac); [t] \"fin fraction\" (pause:short)",
      "self::fraction",
      "not(contains(@grammar, \"endfrac\"))",
      "not(contains(children/*[1]/@annotation, \"clearspeak:unit\"))",
      "not(contains(children/*[2]/@annotation, \"clearspeak:unit\"))"
    ],
    [
      "Rule",
      "vulgar-fraction",
      "Fraction_EndFrac",
      "[p] (pause:short); [n] children/*[1]; [t] \"sur\"; [n] children/*[2] (pause:short)",
      "self::fraction",
      "name(children/*[1])=\"fraction\"",
      "name(children/*[2])=\"fraction\"",
      "contains(children/*[1]/@annotation, \"clearspeak:simple\")",
      "contains(children/*[2]/@annotation, \"clearspeak:simple\")"
    ],
    [
      "Rule",
      "simple-vulgar-fraction",
      "Fraction_EndFrac",
      "[t] CSFvulgarFraction",
      "self::fraction",
      "@role=\"vulgar\"",
      "contains(@annotation, \"clearspeak:simple\")",
      "self::*"
    ],
    [
      "Rule",
      "sqrt",
      "default",
      "[t] \"la racine carrée de\"; [n] children/*[1] (grammar:EndRoot=false, pause:short)",
      "self::sqrt"
    ],
    [
      "Rule",
      "sqrt-nested",
      "default",
      "[p] (pause: \"short\"); [t] \"la racine carrée de\"; [n] children/*[1] (grammar:EndRoot=false, pause:short)",
      "self::sqrt",
      "not(preceding-sibling::*)",
      "ancestor::sqrt|ancestor::root"
    ],
    [
      "Rule",
      "negative-sqrt",
      "default",
      "[t] \"la racine carrée négative de\"; [n] children/*[1]/children/*[1] (grammar:EndRoot=false, pause:short)",
      "self::prefixop",
      "@role=\"negative\"",
      "name(children/*[1])=\"sqrt\""
    ],
    [
      "Rule",
      "negative-sqrt",
      "default",
      "[p] (pause: \"short\"); [t] \"la racine carrée négative de\"; [n] children/*[1]/children/*[1] (grammar:EndRoot=false, pause:short)",
      "self::prefixop",
      "@role=\"negative\"",
      "name(children/*[1])=\"sqrt\"",
      "not(preceding-sibling::*)",
      "ancestor::sqrt|ancestor::root"
    ],
    [
      "Rule",
      "sqrt-plus-minus",
      "Roots_PosNegSqRoot",
      "[t] \"la racine carrée positive de\"; [n] children/*[1] (grammar:EndRoot=false, pause:short)",
      "self::sqrt",
      "parent::stree or not(parent::*/parent::infixop[@role=\"addition\"]) or (parent::*/parent::*[1]/text()!=\"±\" and parent::*/parent::*/text()!=\"∓\")"
    ],
    [
      "Rule",
      "sqrt-nested-plus-minus",
      "Roots_PosNegSqRoot",
      "[p] (pause: \"short\"); [t] \"la racine carrée positive de\"; [n] children/*[1] (grammar:EndRoot=false, pause:short)",
      "self::sqrt",
      "not(preceding-sibling::*)",
      "ancestor::sqrt|ancestor::root",
      "parent::stree or not(parent::*/parent::infixop[@role=\"addition\"]) or (parent::*/parent::*[1]/text()!=\"±\" and parent::*/parent::*/text()!=\"∓\")"
    ],
    [
      "Rule",
      "sqrt-plus-minus",
      "Roots_PosNegSqRootEnd",
      "[t] \"la racine carrée positive de\"; [n] children/*[1] (grammar:EndRoot=false, pause:short)",
      "self::sqrt",
      "parent::stree or not(parent::*/parent::infixop[@role=\"addition\"]) or (parent::*/parent::*[1]/text()!=\"±\" and parent::*/parent::*/text()!=\"∓\")"
    ],
    [
      "Rule",
      "sqrt-nested-plus-minus",
      "Roots_PosNegSqRootEnd",
      "[p] (pause: \"short\"); [t] \"la racine carrée positive de\"; [n] children/*[1] (grammar:EndRoot=false, pause:short)",
      "self::sqrt",
      "not(preceding-sibling::*)",
      "ancestor::sqrt|ancestor::root",
      "parent::stree or not(parent::*/parent::infixop[@role=\"addition\"]) or (parent::*/parent::*[1]/text()!=\"±\" and parent::*/parent::*/text()!=\"∓\")"
    ],
    [
      "Rule",
      "sqrt-endroot",
      "Roots_RootEnd",
      "[n] . (grammar:EndRoot); [t] \"fin racine\" (pause:short)",
      "self::sqrt",
      "not(contains(@grammar, \"EndRoot\"))"
    ],
    [
      "Rule",
      "negative-sqrt-endroot",
      "Roots_RootEnd",
      "[n] . (grammar:EndRoot); [t] \"fin racine\" (pause:short)",
      "self::prefixop",
      "@role=\"negative\"",
      "name(children/*[1])=\"sqrt\"",
      "not(contains(@grammar, \"EndRoot\"))"
    ],
    [
      "Rule",
      "sqrt-endroot",
      "Roots_PosNegSqRootEnd",
      "[n] . (grammar:EndRoot); [t] \"fin racine\" (pause:short)",
      "self::sqrt",
      "not(contains(@grammar, \"EndRoot\"))"
    ],
    [
      "Rule",
      "negative-sqrt-endroot",
      "Roots_PosNegSqRootEnd",
      "[n] . (grammar:EndRoot); [t] \"fin racine\" (pause:short)",
      "self::prefixop",
      "@role=\"negative\"",
      "name(children/*[1])=\"sqrt\"",
      "not(contains(@grammar, \"EndRoot\"))"
    ],
    [
      "Rule",
      "cube",
      "default",
      "[t] \"la racine cubique de\"; [n] children/*[2] (grammar:EndRoot=false, pause:short)",
      "self::root",
      "children/*[1][text()=\"3\"]"
    ],
    [
      "Rule",
      "cube-nested",
      "default",
      "[p] (pause:short); [t] \"la racine cubique de\"; [n] children/*[2] (grammar:EndRoot=false, pause:short)",
      "self::root",
      "children/*[1][text()=\"3\"]",
      "not(preceding-sibling::*)",
      "ancestor::sqrt|ancestor::root"
    ],
    [
      "Rule",
      "root",
      "default",
      "[t] \"la\"; [n] children/*[1] (grammar:ordinal); [t] \"racine de\"; [n] children/*[2] (grammar:EndRoot=false, pause:short)",
      "self::root"
    ],
    [
      "Rule",
      "root-nested",
      "default",
      "[p] (pause:short); [t] \"la\"; [n] children/*[1] (grammar:ordinal); [t] \"racine de\"; [n] children/*[2] (grammar:EndRoot=false, pause:short)",
      "self::root",
      "not(preceding-sibling::*)",
      "ancestor::sqrt|ancestor::root"
    ],
    [
      "Rule",
      "root-endroot",
      "Roots_RootEnd",
      "[n] . (grammar:EndRoot); [t] \"fin racine\" (pause:short)",
      "self::root",
      "not(contains(@grammar, \"EndRoot\"))"
    ],
    [
      "Rule",
      "root-endroot",
      "Roots_PosNegSqRootEnd",
      "[n] . (grammar:EndRoot); [t] \"fin racine\" (pause:short)",
      "self::root",
      "not(contains(@grammar, \"EndRoot\"))"
    ],
    [
      "Rule",
      "negative",
      "default",
      "[t] \"négatif\"; [n] children/*[1]",
      "self::prefixop",
      "@role=\"negative\""
    ],
    [
      "Rule",
      "positive",
      "default",
      "[t] \"positif\"; [n] children/*[1]",
      "self::prefixop",
      "@role=\"positive\""
    ],
    [
      "Rule",
      "angle-measure",
      "default",
      "[t] \"la mesure de l'\" (join:\"\"); [n] content/*[1]; [n] children/*[2] (grammar:angle)",
      "self::infixop",
      "content/*[1]/text()=\"∠\"",
      "children/*[1][text()=\"m\"]"
    ],
    [
      "Rule",
      "prefix",
      "default",
      "[m] content/* (grammar:prefix); [n] children/*[1]",
      "self::prefixop"
    ],
    [
      "Rule",
      "postfix",
      "default",
      "[n] children/*[1]; [m] content/* (grammar:postfix)",
      "self::postfixop"
    ],
    [
      "Rule",
      "set-prefix-operators",
      "default",
      "[t] \"le\"; [n] self::* (grammar:!prefix); [t] \"de\"",
      "self::*",
      "contains(@grammar,\"prefix\")",
      "descendant-or-self::*/text()=\"∩\" or descendant-or-self::*/text()=\"∪\"",
      "self::*",
      "self::*",
      "self::*"
    ],
    [
      "Rule",
      "binary-operation",
      "default",
      "[m] children/* (sepFunc:CTFcontentIterator);",
      "self::infixop"
    ],
    [
      "Rule",
      "division",
      "default",
      "[n] children/*[1]; [t] \"divisé par\"; [n] children/*[2]",
      "self::infixop",
      "@role=\"division\"",
      "count(children/*)=2"
    ],
    [
      "Rule",
      "binary-operation",
      "ImpliedTimes_MoreImpliedTimes",
      "[m] children/* (sepFunc:CTFcontentIterator);",
      "self::infixop",
      "@role=\"implicit\""
    ],
    [
      "Rule",
      "binary-operation-pause",
      "default",
      "[p] (pause:short); [m] children/* (sepFunc:CTFcontentIterator);",
      "self::infixop",
      "@role=\"implicit\"",
      "name(children/*[1])=\"appl\""
    ],
    [
      "Rule",
      "binary-operation-pause",
      "default",
      "[m] children/* (sepFunc:CTFcontentIterator, pause:short)",
      "self::infixop",
      "@role=\"implicit\"",
      "name(children/*[last()])=\"appl\""
    ],
    [
      "Rule",
      "binary-operation-pause",
      "default",
      "[p] (pause:short); [m] children/* (sepFunc:CTFcontentIterator, pause:short)",
      "self::infixop",
      "@role=\"implicit\"",
      "name(children/*[1])=\"appl\"",
      "name(children/*[last()])=\"appl\""
    ],
    [
      "Rule",
      "implicit-times",
      "default",
      "[p] (pause:short)",
      "self::operator",
      "@role=\"multiplication\"",
      "text()=\"⁢\""
    ],
    [
      "Rule",
      "implicit-times",
      "default",
      "",
      "self::operator",
      "@role=\"multiplication\"",
      "text()=\"⁢\"",
      "CQFsimpleArguments"
    ],
    [
      "Rule",
      "implicit-times",
      "default",
      "[n] text()",
      "self::operator",
      "@role=\"multiplication\"",
      "text()=\"⁢\"",
      "CQFfencedArguments"
    ],
    [
      "Rule",
      "implicit-times",
      "ImpliedTimes_MoreImpliedTimes",
      "[n] text()",
      "self::operator",
      "@role=\"multiplication\"",
      "text()=\"⁢\""
    ],
    [
      "Rule",
      "implicit-times",
      "ImpliedTimes_None",
      "",
      "self::operator",
      "@role=\"multiplication\"",
      "text()=\"⁢\""
    ],
    [
      "Rule",
      "binary-operation-simple",
      "default",
      "[m] children/* (rate:\"0.5\", pause:short)",
      "self::infixop",
      "@role=\"implicit\"",
      "contains(@annotation, \"clearspeak:simple\")",
      "not(contains(@grammar, \"inFrac\"))"
    ],
    [
      "Rule",
      "simple-in-fraction",
      "default",
      "[n] . (rate:\"0.5\",grammar:inFrac)",
      "self::*",
      "contains(@annotation, \"clearspeak:simple\")",
      "not(contains(@grammar, \"inFrac\"))",
      "name(.)!=\"identifier\"",
      "name(.)!=\"function\"",
      "name(.)!=\"number\"",
      "name(parent::*/parent::*)=\"fraction\"",
      "not(preceding-sibling::*)"
    ],
    [
      "Rule",
      "operators-after-power",
      "Exponent_AfterPower",
      "[m] children/* (rate:\"0.5\")",
      "self::infixop",
      "@role=\"implicit\"",
      "contains(@grammar, \"afterPower\")"
    ],
    [
      "Rule",
      "relseq",
      "default",
      "[m] children/* (sepFunc:CTFcontentIterator)",
      "self::relseq"
    ],
    [
      "Rule",
      "multrel",
      "default",
      "[m] children/* (sepFunc:CTFcontentIterator)",
      "self::multirel"
    ],
    [
      "Rule",
      "natural-numbers",
      "default",
      "[t] \"les nombres entier naturel\"",
      "self::identifier",
      "text()=\"ℕ\" or (text()=\"N\" and @font=\"double-struck\")",
      "self::*",
      "self::*",
      "self::*"
    ],
    [
      "Rule",
      "integers",
      "default",
      "[t] \"les nombres entiers\"",
      "self::identifier",
      "text()=\"ℤ\" or (text()=\"Z\" and @font=\"double-struck\")",
      "self::*",
      "self::*",
      "self::*"
    ],
    [
      "Rule",
      "rational-numbers",
      "default",
      "[t] \"les Nombres rationnels\"",
      "self::identifier",
      "text()=\"ℚ\" or (text()=\"Q\" and @font=\"double-struck\")",
      "self::*",
      "self::*",
      "self::*"
    ],
    [
      "Rule",
      "real-numbers",
      "default",
      "[t] \"les nombres réels\"",
      "self::identifier",
      "text()=\"ℝ\" or (text()=\"R\" and @font=\"double-struck\")",
      "self::*",
      "self::*",
      "self::*"
    ],
    [
      "Rule",
      "complex-numbers",
      "default",
      "[t] \"les nombres complexes\"",
      "self::identifier",
      "text()=\"ℂ\" or (text()=\"C\" and @font=\"double-struck\")",
      "self::*",
      "self::*",
      "self::*"
    ],
    [
      "Rule",
      "natural-numbers-super",
      "default",
      "[t] \"n\" (join: \"-\"); [n] children/*[2] (grammar:numbers2alpha)",
      "self::superscript",
      "children/*[1]/text()=\"ℕ\" or (children/*[1]/text()=\"N\" and children/*[1]/@font=\"double-struck\")",
      "self::*",
      "self::*",
      "self::*"
    ],
    [
      "Rule",
      "integers-super",
      "default",
      "[t] \"z\" (join: \"-\"); [n] children/*[2] (grammar:numbers2alpha)",
      "self::superscript",
      "children/*[1]/text()=\"ℤ\" or (children/*[1]/text()=\"Z\" and children/*[1]/@font=\"double-struck\")",
      "self::*",
      "self::*",
      "self::*"
    ],
    [
      "Rule",
      "rational-numbers-super",
      "default",
      "[t] \"q\" (join: \"-\"); [n] children/*[2] (grammar:numbers2alpha)",
      "self::superscript",
      "children/*[1]/text()=\"ℚ\" or (children/*[1]/text()=\"Q\" and children/*[1]/@font=\"double-struck\")",
      "self::*",
      "self::*",
      "self::*"
    ],
    [
      "Rule",
      "real-numbers-super",
      "default",
      "[t] \"r\" (join:\"-\"); [n] children/*[2] (grammar:numbers2alpha)",
      "self::superscript",
      "children/*[1]/text()=\"ℝ\" or (children/*[1]/text()=\"R\" and children/*[1]/@font=\"double-struck\")",
      "self::*",
      "self::*",
      "self::*"
    ],
    [
      "Rule",
      "complex-numbers-super",
      "default",
      "[t] \"c\" (join:\"-\"); [n] children/*[2] (grammar:numbers2alpha)",
      "self::superscript",
      "children/*[1]/text()=\"ℂ\" or (children/*[1]/text()=\"C\" and children/*[1]/@font=\"double-struck\")",
      "self::*",
      "self::*",
      "self::*"
    ],
    [
      "Rule",
      "natural-numbers-with-zero",
      "default",
      "[t] \"les nombres entiers naturel avec zero\"",
      "self::subscript",
      "children/*[1]/text()=\"ℕ\" or (children/*[1]/text()=\"N\" and children/*[1]/@font=\"double-struck\")",
      "children/*[2]/text()=\"0\""
    ],
    [
      "Rule",
      "positive-integers",
      "default",
      "[t] \"les nombres entiers positif\"",
      "self::superscript",
      "children/*[1]/text()=\"ℤ\" or (children/*[1]/text()=\"Z\" and children/*[1]/@font=\"double-struck\")",
      "children/*[2]/text()=\"+\"",
      "self::*",
      "self::*",
      "self::*"
    ],
    [
      "Rule",
      "positive-integers",
      "default",
      "[t] \"les nombres entiers négatif\"",
      "self::superscript",
      "children/*[1]/text()=\"ℤ\" or (children/*[1]/text()=\"Z\" and children/*[1]/@font=\"double-struck\")",
      "children/*[2]/text()=\"-\"",
      "self::*",
      "self::*",
      "self::*"
    ],
    [
      "Rule",
      "positive-rational-numbers",
      "default",
      "[t] \"les nombres rationnels positif\"",
      "self::superscript",
      "children/*[1]/text()=\"ℚ\" or (children/*[1]/text()=\"Q\" and children/*[1]/@font=\"double-struck\")",
      "children/*[2]/text()=\"+\"",
      "self::*",
      "self::*",
      "self::*"
    ],
    [
      "Rule",
      "negative-rational-numbers",
      "default",
      "[t] \"les nombres rationnels négatif\"",
      "self::superscript",
      "children/*[1]/text()=\"ℚ\" or (children/*[1]/text()=\"Q\" and children/*[1]/@font=\"double-struck\")",
      "children/*[2]/text()=\"-\"",
      "self::*",
      "self::*",
      "self::*"
    ],
    [
      "Rule",
      "fences-neutral",
      "default",
      "[p] (pause:short); [t] \"la valeur absolue de\"; [n] children/*[1] (pause: short)",
      "self::fenced",
      "@role=\"neutral\"",
      "content/*[1][text()]=\"|\" or content/*[1][text()]=\"❘\" or content/*[1][text()]=\"｜\" or content/*[1][text()]=\"∣\""
    ],
    [
      "Rule",
      "fences-neutral",
      "AbsoluteValue_AbsEnd",
      "[p] (pause:short); [t] \"la valeur absolue de\"; [n] children/*[1] (pause: short); [t] \"fin de valeur absolue\" (pause: short)",
      "self::fenced",
      "@role=\"neutral\"",
      "content/*[1][text()]=\"|\" or content/*[1][text()]=\"❘\" or content/*[1][text()]=\"｜\" or content/*[1][text()]=\"∣\""
    ],
    [
      "Rule",
      "fences-neutral",
      "AbsoluteValue_Cardinality",
      "[p] (pause:short); [t] \"la cardinalité de\"; [n] children/*[1] (pause: short)",
      "self::fenced",
      "@role=\"neutral\"",
      "content/*[1][text()]=\"|\" or content/*[1][text()]=\"❘\" or content/*[1][text()]=\"｜\" or content/*[1][text()]=\"∣\""
    ],
    [
      "Rule",
      "fences-neutral",
      "AbsoluteValue_Determinant",
      "[p] (pause:short); [t] \"le déterminant de\"; [n] children/*[1] (pause: short)",
      "self::fenced",
      "@role=\"neutral\"",
      "content/*[1][text()]=\"|\" or content/*[1][text()]=\"❘\" or content/*[1][text()]=\"｜\" or content/*[1][text()]=\"∣\""
    ],
    [
      "Rule",
      "matrix",
      "default",
      "[t] \"la matrice de dimension\"; [t] count(children/*);  [t] \"par\"; [t] count(children/*[1]/children/*) (pause:long); [m] children/* (ctxtFunc:CTFnodeCounter,context:\"Rangée-:\", pause:long)",
      "self::matrix"
    ],
    [
      "Rule",
      "matrix-simple",
      "default",
      "[t] \"la matrice de dimension\"; [t] count(children/*);  [t] \"par\"; [t] count(children/*[1]/children/*) (pause:long); [m] children/* (ctxtFunc:CTFnodeCounter,context:\"Rangée-:\",grammar:simpleDet, pause:long)",
      "self::matrix",
      "count(children/*)<4",
      "count(children/*[1]/children/*)<4",
      "CQFcellsSimple"
    ],
    [
      "Rule",
      "matrix-trivial",
      "default",
      "[t] \"la matrice de dimension 1 par 1 avec élément\"; [n] children/*[1] (pause:long)",
      "self::vector",
      "@role=\"squarematrix\""
    ],
    [
      "Rule",
      "determinant",
      "default",
      "[t] \"le déterminant de la matrice de dimension\"; [t] count(children/*); [t] \"par\"; [t] count(children/*[1]/children/*) (pause:long); [m] children/* (ctxtFunc:CTFnodeCounter,context:\"Rangée-:\",grammar:simpleDet, pause:long)",
      "self::matrix",
      "@role=\"determinant\"",
      "count(children/*)<4",
      "CQFcellsSimple"
    ],
    [
      "Rule",
      "determinant-simple",
      "default",
      "[t] \"le déterminant de la matrice de dimension\"; [t] count(children/*);  [t] \"par\"; [t] count(children/*[1]/children/*) (pause:long); [m] children/* (ctxtFunc:CTFnodeCounter,context:\"Rangée-:\", pause:long)",
      "self::matrix",
      "@role=\"determinant\""
    ],
    [
      "Rule",
      "matrix-vector",
      "default",
      "[t] \"la matrice colonne de dimension\"; [t] count(children/*); [t] \"par\"; [t] count(children/*[1]/children/*) (pause:long); [m] children/* (ctxtFunc:CTFnodeCounter,context:\"Rangée-:\",grammar:simpleDet, pause:long)",
      "self::vector"
    ],
    [
      "SpecializedRule",
      "matrix-vector",
      "default",
      "Matrix_SpeakColNum"
    ],
    [
      "Rule",
      "matrix-vector-simple",
      "default",
      "[t] \"la matrice colonne de dimension\"; [t] count(children/*); [t] \"par\"; [t] count(children/*[1]/children/*) (pause:long); [m] children/* (sepFunc:CTFpauseSeparator,separator:\"short\",grammar:simpleDet, pause:long)",
      "self::vector",
      "count(children/*)<4",
      "CQFcellsSimple",
      "@role!=\"squarematrix\""
    ],
    [
      "Rule",
      "matrix-vector-simple",
      "Matrix_SilentColNum",
      "[t] \"la matrice colonne de dimension\"; [t] count(children/*); [t] \"par\"; [t] count(children/*[1]/children/*) (pause:long); [m] children/* (sepFunc:CTFpauseSeparator,separator:\"short\",grammar:simpleDet, pause:long)",
      "self::vector"
    ],
    [
      "Rule",
      "matrix-row-vector",
      "default",
      "[t] \"la matrice ligne de dimension\"; [t] count(children/*); [t] \"par\"; [t] count(children/*[1]/children/*) (pause:long); [m] children/*[1]/children/* (ctxtFunc:CTFnodeCounter,context:\"Colonne-:\",grammar:simpleDet, pause:long)",
      "self::matrix",
      "@role=\"rowvector\""
    ],
    [
      "SpecializedRule",
      "matrix-row-vector",
      "default",
      "Matrix_SpeakColNum"
    ],
    [
      "Rule",
      "matrix-row-vector-simple",
      "default",
      "[t] \"la matrice ligne de dimension\"; [t] count(children/*); [t] \"par\"; [t] count(children/*[1]/children/*) (pause:long); [m] children/*[1]/children/* (sepFunc:CTFpauseSeparator,separator:\"short\",grammar:simpleDet, pause:long)",
      "self::matrix",
      "@role=\"rowvector\"",
      "count(children/*[1]/children/*)<4",
      "CQFcellsSimple"
    ],
    [
      "Rule",
      "matrix-row-vector-simple",
      "Matrix_SilentColNum",
      "[t] \"la matrice ligne de dimension\"; [t] count(children/*); [t] \"par\"; [t] count(children/*[1]/children/*) (pause:long); [m] children/*[1]/children/* (sepFunc:CTFpauseSeparator,separator:\"short\",grammar:simpleDet, pause:long)",
      "self::matrix",
      "@role=\"rowvector\""
    ],
    [
      "Rule",
      "matrix-row-simple",
      "default",
      "[m] children/* (sepFunc:CTFpauseSeparator,separator:\"short\")",
      "self::row",
      "contains(@grammar, \"simpleDet\")"
    ],
    [
      "Rule",
      "matrix-row-simple",
      "Matrix_SilentColNum",
      "[m] children/* (sepFunc:CTFpauseSeparator,separator:\"short\")",
      "self::row"
    ],
    [
      "Rule",
      "line-simple",
      "default",
      "[n] children/*[1]",
      "self::line",
      "contains(@grammar, \"simpleDet\")"
    ],
    [
      "Rule",
      "matrix-row",
      "default",
      "[m] children/* (ctxtFunc:CTFnodeCounter,context:\"Colonne-,- \",sepFunc:CTFpauseSeparator,separator:\"medium\", pause:long)",
      "self::row"
    ],
    [
      "SpecializedRule",
      "matrix-row",
      "default",
      "Matrix_SpeakColNum"
    ],
    [
      "Rule",
      "matrix-cell",
      "default",
      "[n] children/*[1]",
      "self::cell"
    ],
    [
      "Rule",
      "matrix-end-matrix",
      "Matrix_EndMatrix",
      "[n] . (grammar:EndMatrix); [t] \"fin matrice\"",
      "self::matrix",
      "not(contains(@grammar, \"EndMatrix\"))"
    ],
    [
      "Rule",
      "matrix-end-vector",
      "Matrix_EndMatrix",
      "[n] . (grammar:EndMatrix); [t] \"fin matrice\"",
      "self::vector",
      "not(contains(@grammar, \"EndMatrix\"))"
    ],
    [
      "Rule",
      "matrix-end-determinant",
      "Matrix_EndMatrix",
      "[n] . (grammar:EndMatrix); [t] \"fin déterminant\"",
      "self::matrix",
      "@role=\"determinant\"",
      "not(contains(@grammar, \"EndMatrix\"))"
    ],
    [
      "Rule",
      "vector",
      "Matrix_Vector",
      "[t] \"le vecteur colonne de dimension\"; [t] count(children/*); [t] \"par\"; [t] count(children/*[1]/children/*) (pause:long); [m] children/* (ctxtFunc:CTFnodeCounter,context:\"Rangée-:\",grammar:simpleDet, pause:long)",
      "self::vector"
    ],
    [
      "SpecializedRule",
      "vector",
      "Matrix_Vector",
      "Matrix_EndVector"
    ],
    [
      "Rule",
      "vector-simple",
      "Matrix_Vector",
      "[t] \"le vecteur colonne de dimension\"; [t] count(children/*); [t] \"par\";  [t] count(children/*[1]/children/*) (pause:long); [m] children/* (sepFunc:CTFpauseSeparator,separator:\"short\",grammar:simpleDet, pause:long)",
      "self::vector",
      "count(children/*)<4",
      "CQFcellsSimple"
    ],
    [
      "SpecializedRule",
      "vector-simple",
      "Matrix_Vector",
      "Matrix_EndVector"
    ],
    [
      "Rule",
      "row-vector",
      "Matrix_Vector",
      "[t] \"le vecteur ligne de dimension\"; [t] count(children/*); [t] \"par\"; [t] count(children/*[1]/children/*) (pause:long); [m] children/*[1]/children/* (ctxtFunc:CTFnodeCounter,context:\"Colonne-:\",grammar:simpleDet, pause:long)",
      "self::matrix",
      "@role=\"rowvector\""
    ],
    [
      "SpecializedRule",
      "row-vector",
      "Matrix_Vector",
      "Matrix_EndVector"
    ],
    [
      "Rule",
      "row-vector-simple",
      "Matrix_Vector",
      "[t] \"le vecteur ligne de dimension\"; [t] count(children/*); [t] \"par\"; [t] count(children/*[1]/children/*) (pause:long); [m] children/*[1]/children/* (sepFunc:CTFpauseSeparator,separator:\"short\",grammar:simpleDet, pause:long)",
      "self::matrix",
      "@role=\"rowvector\"",
      "count(children/*[1]/children/*)<4",
      "CQFcellsSimple"
    ],
    [
      "SpecializedRule",
      "row-vector-simple",
      "Matrix_Vector",
      "Matrix_EndVector"
    ],
    [
      "Rule",
      "vector-end-matrix",
      "Matrix_EndVector",
      "[n] . (grammar:EndMatrix); [t] \"fin matrice\"",
      "self::matrix",
      "not(contains(@grammar, \"EndMatrix\"))",
      "self::*"
    ],
    [
      "Rule",
      "vector-end-vector",
      "Matrix_EndVector",
      "[n] . (grammar:EndMatrix); [t] \"fin vecteur\"",
      "self::vector",
      "not(contains(@grammar, \"EndMatrix\"))",
      "self::*"
    ],
    [
      "Rule",
      "vector-end-vector",
      "Matrix_EndVector",
      "[n] . (grammar:EndMatrix); [t] \"fin vecteur\"",
      "self::matrix",
      "@role=\"rowvector\"",
      "not(contains(@grammar, \"EndMatrix\"))",
      "self::*"
    ],
    [
      "Rule",
      "vector-end-determinant",
      "Matrix_EndVector",
      "[n] . (grammar:EndMatrix); [t] \"fin déterminant\"",
      "self::matrix",
      "@role=\"determinant\"",
      "not(contains(@grammar, \"EndMatrix\"))",
      "self::*"
    ],
    [
      "Rule",
      "binomial",
      "Matrix_Combinatoric",
      "[n] children/*[2]/children/*[1]; [t] \"parmi\"; [n] children/*[1]/children/*[1]; ",
      "self::vector",
      "@role=\"binomial\""
    ],
    [
      "Rule",
      "lines-summary",
      "default",
      "[p] (pause:short); [t] count(children/*); [t] \"lignes\";  [n] . (grammar:layoutSummary)",
      "self::multiline",
      "not(contains(@grammar, \"layoutSummary\"))",
      "self::*"
    ],
    [
      "Rule",
      "lines-summary",
      "MultiLineOverview_None",
      "[n] . (grammar:layoutSummary)",
      "self::multiline",
      "not(contains(@grammar, \"layoutSummary\"))",
      "self::*"
    ],
    [
      "Aliases",
      "lines-summary",
      "self::table",
      "not(contains(@grammar, \"layoutSummary\"))"
    ],
    [
      "Rule",
      "cases-summary",
      "default",
      "[p] (pause:short); [t] count(children/*); [t] \"cas\";  [n] . (grammar:layoutSummary)",
      "self::cases",
      "not(contains(@grammar, \"layoutSummary\"))"
    ],
    [
      "Rule",
      "cases-summary",
      "MultiLineOverview_None",
      "[n] . (grammar:layoutSummary)",
      "self::cases",
      "not(contains(@grammar, \"layoutSummary\"))",
      "self::*"
    ],
    [
      "Rule",
      "lines",
      "default",
      "[p] (pause:short); [m] children/* (ctxtFunc:CTFnodeCounter,context:\"Ligne-:\",sepFunc:CTFpauseSeparator,separator:\"long\", pause:long)",
      "self::table"
    ],
    [
      "Aliases",
      "lines",
      "self::multiline"
    ],
    [
      "Rule",
      "line",
      "default",
      "[n] children/*[1]",
      "self::line"
    ],
    [
      "Rule",
      "row-medium",
      "default",
      "[m] children/* (sepFunc:CTFpauseSeparator,separator:\"medium\")",
      "self::row",
      "@role=\"table\""
    ],
    [
      "Aliases",
      "row-medium",
      "self::row",
      "@role=\"cases\""
    ],
    [
      "Rule",
      "row-long",
      "MultiLinePausesBetweenColumns_Long",
      "[m] children/* (sepFunc:CTFpauseSeparator,separator:\"long\")",
      "self::row",
      "@role=\"table\""
    ],
    [
      "Aliases",
      "row-long",
      "self::row",
      "@role=\"cases\""
    ],
    [
      "Rule",
      "row-short",
      "MultiLinePausesBetweenColumns_Short",
      "[m] children/* (sepFunc:CTFpauseSeparator,separator:\"short\")",
      "self::row",
      "@role=\"table\""
    ],
    [
      "Aliases",
      "row-short",
      "self::row",
      "@role=\"cases\""
    ],
    [
      "Rule",
      "blank-cell",
      "default",
      "[t] \"vide\"",
      "self::cell",
      "count(children/*)=0"
    ],
    [
      "Rule",
      "blank-line",
      "default",
      "[t] \"vide\"",
      "self::line",
      "count(children/*)=0"
    ],
    [
      "Rule",
      "blank-cell-empty",
      "default",
      "[t] \"vide\"",
      "self::empty",
      "count(../*)=1",
      "name(../..)=\"cell\""
    ],
    [
      "Rule",
      "blank-line-empty",
      "default",
      "[t] \"vide\"",
      "self::empty",
      "count(../*)=1",
      "name(../..)=\"line\""
    ],
    [
      "Rule",
      "cases",
      "default",
      "[p] (pause:short);  [m] children/* (ctxtFunc:CTFnodeCounter,context:\"Cas-:\",sepFunc:CTFpauseSeparator,separator:\"long\", pause:long)",
      "self::cases"
    ],
    [
      "Rule",
      "lines-cases-summary",
      "MultiLineLabel_Case",
      "[p] (pause:short); [t] count(children/*); [t] \"cas\";  [n] . (grammar:layoutSummary)",
      "self::multiline",
      "not(contains(@grammar, \"layoutSummary\"))"
    ],
    [
      "Aliases",
      "lines-cases-summary",
      "self::table",
      "not(contains(@grammar, \"layoutSummary\"))"
    ],
    [
      "Rule",
      "lines-cases",
      "MultiLineLabel_Case",
      "[p] (pause:short); [m] children/* (ctxtFunc:CTFnodeCounter,context:\"Cas-:\",sepFunc:CTFpauseSeparator,separator:\"long\", pause:long)",
      "self::table"
    ],
    [
      "Aliases",
      "lines-cases",
      "self::multiline"
    ],
    [
      "Rule",
      "lines-equations-summary",
      "MultiLineLabel_Equation",
      "[p] (pause:short); [t] count(children/*); [t] \"équations\";  [n] . (grammar:layoutSummary)",
      "self::multiline",
      "not(contains(@grammar, \"layoutSummary\"))"
    ],
    [
      "Aliases",
      "lines-equations-summary",
      "self::table",
      "not(contains(@grammar, \"layoutSummary\"))"
    ],
    [
      "Rule",
      "lines-equations",
      "MultiLineLabel_Equation",
      "[p] (pause:short); [m] children/* (ctxtFunc:CTFnodeCounter,context:\"Équation-:\",sepFunc:CTFpauseSeparator,separator:\"long\", pause:long)",
      "self::table"
    ],
    [
      "Aliases",
      "lines-equations",
      "self::multiline"
    ],
    [
      "Rule",
      "lines-steps-summary",
      "MultiLineLabel_Step",
      "[p] (pause:short); [t] count(children/*); [t] \" étapes\";  [n] . (grammar:layoutSummary)",
      "self::multiline",
      "not(contains(@grammar, \"layoutSummary\"))"
    ],
    [
      "Aliases",
      "lines-steps-summary",
      "self::table",
      "not(contains(@grammar, \"layoutSummary\"))"
    ],
    [
      "Rule",
      "lines-steps",
      "MultiLineLabel_Step",
      "[p] (pause:short); [m] children/* (ctxtFunc:CTFnodeCounter,context:\" Étape-:\",sepFunc:CTFpauseSeparator,separator:\"long\", pause:long)",
      "self::table"
    ],
    [
      "Aliases",
      "lines-steps",
      "self::multiline"
    ],
    [
      "Rule",
      "lines-rows-summary",
      "MultiLineLabel_Row",
      "[p] (pause:short); [t] count(children/*); [t] \"colonnes\";  [n] . (grammar:layoutSummary)",
      "self::multiline",
      "not(contains(@grammar, \"layoutSummary\"))"
    ],
    [
      "Aliases",
      "lines-rows-summary",
      "self::table",
      "not(contains(@grammar, \"layoutSummary\"))"
    ],
    [
      "Rule",
      "lines-rows",
      "MultiLineLabel_Row",
      "[p] (pause:short); [m] children/* (ctxtFunc:CTFnodeCounter,context:\"Rangée-:\",sepFunc:CTFpauseSeparator,separator:\"long\", pause:long)",
      "self::table"
    ],
    [
      "Aliases",
      "lines-rows",
      "self::multiline"
    ],
    [
      "Rule",
      "lines-constraints-summary",
      "MultiLineLabel_Constraint",
      "[p] (pause:short); [t] count(children/*); [t] \"contraintes\";  [n] . (grammar:layoutSummary)",
      "self::multiline",
      "not(contains(@grammar, \"layoutSummary\"))"
    ],
    [
      "Aliases",
      "lines-constraints-summary",
      "self::table",
      "not(contains(@grammar, \"layoutSummary\"))"
    ],
    [
      "Rule",
      "lines-constraints",
      "MultiLineLabel_Constraint",
      "[p] (pause:short); [m] children/* (ctxtFunc:CTFnodeCounter,context:\"Contrainte-:\",sepFunc:CTFpauseSeparator,separator:\"long\", pause:long)",
      "self::table"
    ],
    [
      "Aliases",
      "lines-constraints",
      "self::multiline"
    ],
    [
      "Rule",
      "lines-none",
      "MultiLineLabel_None",
      "[p] (pause:short); [m] children/* (sepFunc:CTFpauseSeparator,separator:\"long\", pause:long)",
      "self::table",
      "contains(@grammar, \"layoutSummary\")"
    ],
    [
      "Aliases",
      "lines-none",
      "self::multiline",
      "contains(@grammar, \"layoutSummary\")"
    ],
    [
      "Aliases",
      "lines-none",
      "self::cases",
      "contains(@grammar, \"layoutSummary\")"
    ],
    [
      "Rule",
      "bigop",
      "default",
      "[t] \"le\"; [n] children/*[1]; [t] \"de\"; [n] children/*[2] (pause:short)",
      "self::bigop"
    ],
    [
      "Rule",
      "limboth",
      "default",
      "[n] children/*[1]; [t] \"de\"; [n] children/*[2];[t] \"à\"; [n] children/*[3];",
      "self::limboth"
    ],
    [
      "Rule",
      "limlower",
      "default",
      "[n] children/*[1]; [t] \"sur\"; [n] children/*[2] (pause:short)",
      "self::limlower"
    ],
    [
      "Rule",
      "limupper",
      "default",
      "[n] children/*[1]; [t] \"sous\"; [n] children/*[2] (pause:short)",
      "self::limupper"
    ],
    [
      "Rule",
      "integral",
      "default",
      "[t] \"le\"; [n] children/*[1]; [t] \"de\"; [n] children/*[2] (pause:short)",
      "self::integral"
    ],
    [
      "Rule",
      "overscript",
      "default",
      "[n] children/*[1]; [t] \"sous\"; [n] children/*[2] (pause:short)",
      "self::overscore"
    ],
    [
      "Rule",
      "overscript",
      "default",
      "[n] children/*[1]; [n] children/*[2];",
      "self::overscore",
      "children/*[2][@role=\"overaccent\"]"
    ],
    [
      "Rule",
      "overscript-limits",
      "default",
      "[n] children/*[1]; [t] \"à\"; [n] children/*[2]",
      "self::overscore",
      "children/*[2][@role!=\"overaccent\"]",
      "name(children/*[1])=\"underscore\"",
      "children/*[1]/children/*[2][@role!=\"underaccent\"]"
    ],
    [
      "Rule",
      "underscript",
      "default",
      "[n] children/*[1]; [t] \"sur\"; [n] children/*[2] (pause:short)",
      "self::underscore"
    ],
    [
      "Rule",
      "underscript-limits",
      "default",
      "[n] children/*[1]; [t] \"de\"; [n] children/*[2]",
      "self::underscore",
      "@role=\"underover\"",
      "children/*[2][@role!=\"underaccent\"]"
    ],
    [
      "Rule",
      "number",
      "default",
      "[n] text()",
      "self::number"
    ],
    [
      "Rule",
      "mixed-number",
      "default",
      "[n] children/*[1]; [t] \"et\"; [n] children/*[2]; ",
      "self::number",
      "@role=\"mixed\""
    ],
    [
      "Rule",
      "number-with-chars",
      "default",
      "[t] \"nombre\"; [m] CQFspaceoutNumber (grammar:protected)",
      "self::number",
      "@role=\"othernumber\"",
      "\"\" != translate(text(), \"0123456789.,\", \"\")",
      "not(contains(@grammar, \"protected\"))"
    ],
    [
      "Rule",
      "decimal-period",
      "default",
      "[t] \"la décimale\"; [n] children/*[1] (grammar:spaceout); [t] \"virgule suivi par les chiffres répétés\";  [n] children/*[3]/children/*[1] (grammar:spaceout)",
      "self::punctuated",
      "@role=\"sequence\"",
      "count(./content/*)=1",
      "./content/*[1][@role=\"fullstop\"]",
      "name(children/*[1])=\"number\"",
      "children/*[1][@role=\"integer\"]",
      "name(children/*[3])=\"overscore\"",
      "children/*[3][@role=\"integer\"]",
      "children/*[3]/children/*[2][@role=\"overaccent\"]",
      "children/*[3]/children/*[2][text()=\"¯\" or text()=\"￣\" or text()=\"＿\" or text()=\"_\" or text()=\"‾\"]"
    ],
    [
      "Rule",
      "decimal-period",
      "default",
      "[t] \"la décimale\"; [n] children/*[1] (grammar:spaceout); [t] \"suivi par les chiffres répétés\";  [n] children/*[2]/children/*[1] (grammar:spaceout);",
      "self::infixop",
      "@role=\"implicit\"",
      "count(./children/*)=2",
      "name(children/*[1])=\"number\"",
      "children/*[1][@role=\"float\"]",
      "name(children/*[2])=\"overscore\"",
      "children/*[2][@role=\"integer\"]",
      "children/*[2]/children/*[2][@role=\"overaccent\"]",
      "children/*[2]/children/*[2][text()=\"¯\" or text()=\"￣\" or text()=\"＿\" or text()=\"_\" or text()=\"‾\"]"
    ],
    [
      "Rule",
      "decimal-period-singular",
      "default",
      "[t] \"la décimale\"; [n] children/*[1] (grammar:spaceout); [t] \"virgule suivi par le chiffre répété\";  [n] children/*[3]/children/*[1] (grammar:spaceout)",
      "self::punctuated",
      "@role=\"sequence\"",
      "count(./content/*)=1",
      "./content/*[1][@role=\"fullstop\"]",
      "name(children/*[1])=\"number\"",
      "children/*[1][@role=\"integer\"]",
      "name(children/*[3])=\"overscore\"",
      "children/*[3][@role=\"integer\"]",
      "children/*[3]/children/*[2][@role=\"overaccent\"]",
      "children/*[3]/children/*[2][text()=\"¯\" or text()=\"￣\" or text()=\"＿\" or text()=\"_\" or text()=\"‾\"]",
      "string-length(./children/*[3]/children/*[1]/text())=1"
    ],
    [
      "Rule",
      "decimal-period-singular",
      "default",
      "[t] \"la décimale\"; [n] children/*[1] (grammar:spaceout); [t] \"suivi par le chiffre répété\";  [n] children/*[2]/children/*[1] (grammar:spaceout);",
      "self::infixop",
      "@role=\"implicit\"",
      "count(./children/*)=2",
      "name(children/*[1])=\"number\"",
      "children/*[1][@role=\"float\"]",
      "name(children/*[2])=\"overscore\"",
      "children/*[2][@role=\"integer\"]",
      "children/*[2]/children/*[2][@role=\"overaccent\"]",
      "children/*[2]/children/*[2][text()=\"¯\" or text()=\"￣\" or text()=\"＿\" or text()=\"_\" or text()=\"‾\"]",
      "string-length(./children/*[2]/children/*[1]/text())=1"
    ],
    [
      "Rule",
      "number-with-spaces",
      "default",
      "[m] CQFspaceoutNumber (grammar:!spaceout:number)",
      "self::number",
      "contains(@grammar, \"spaceout\")"
    ],
    [
      "Rule",
      "decimal-point",
      "default",
      "[t] \"point\"",
      "self::punctuation",
      "@role=\"fullstop\"",
      "contains(@grammar,\"number\")"
    ],
    [
      "Rule",
      "line-segment",
      "default",
      "[t] \"le segment\"; [n] children/*[1]/children/*[1]; [n] children/*[1]/children/*[2] (pause:short)",
      "self::overscore",
      "@role=\"implicit\"",
      "children/*[2][@role=\"overaccent\"]",
      "children/*[2][text()=\"¯\" or text()=\"￣\" or text()=\"＿\" or text()=\"_\" or text()=\"‾\"]",
      "name(children/*[1])=\"infixop\"",
      "count(./children/*[1]/children/*)=2"
    ],
    [
      "Rule",
      "conjugate",
      "Bar_Conjugate",
      "[t] \"le complexe conjugué de\"; [n] children/*[1]",
      "self::overscore",
      "children/*[2][@role=\"overaccent\"]",
      "children/*[2][text()=\"¯\" or text()=\"￣\" or text()=\"＿\" or text()=\"_\" or text()=\"‾\"]"
    ],
    [
      "Rule",
      "defined-by",
      "default",
      "[t] \"est défini par\" (pause:short)",
      "self::overscore",
      "@role=\"equality\"",
      "@embellished=\"relation\"",
      "name(children/*[2])=\"text\"",
      "children/*[2][text()]=\"def\""
    ],
    [
      "Rule",
      "adorned-sign",
      "default",
      "[t] \"signe\"; [n] children/*[1] ; [t] \"avec\"; [n] children/*[2]; [t] \"dessus\"",
      "self::overscore",
      "@embellished",
      "name(children/*[1])=\"operator\" or name(children/*[1])=\"relation\""
    ],
    [
      "Rule",
      "factorial",
      "default",
      "[t] \"factorielle\"",
      "self::punctuation",
      "text()=\"!\"",
      "name(preceding-sibling::*[1])!=\"text\""
    ],
    [
      "Rule",
      "tensor-base",
      "default",
      "[n] children/*[2]; [n] children/*[3]; [n] children/*[1]; [n] children/*[4]; [n] children/*[5]",
      "self::tensor"
    ],
    [
      "Rule",
      "left-super",
      "default",
      "[t] \"exposant gauche\"; [n] text()",
      "self::*[@role=\"leftsuper\"]",
      "not(contains(@grammar,\"combinatorics\"))"
    ],
    [
      "Rule",
      "left-super",
      "default",
      "[t] \"exposant gauche\"; [m] children/*",
      "self::punctuated",
      "@role=\"leftsuper\"",
      "not(contains(@grammar,\"combinatorics\"))"
    ],
    [
      "Rule",
      "left-sub",
      "default",
      "[t] \"indice gauche\"; [n] text()",
      "self::*[@role=\"leftsub\"]",
      "not(contains(@grammar,\"combinatorics\"))"
    ],
    [
      "Rule",
      "left-sub",
      "default",
      "[t] \"indice gauche\"; [m] children/*",
      "self::punctuated",
      "@role=\"leftsub\"",
      "not(contains(@grammar,\"combinatorics\"))"
    ],
    [
      "Rule",
      "right-super",
      "default",
      "[t] \"exposant droite\"; [n] text()",
      "self::*[@role=\"rightsuper\"]",
      "not(contains(@grammar,\"combinatorics\"))"
    ],
    [
      "Rule",
      "right-super",
      "default",
      "[t] \"exposant droite\"; [m] children/*",
      "self::punctuated",
      "@role=\"rightsuper\"",
      "not(contains(@grammar,\"combinatorics\"))"
    ],
    [
      "Rule",
      "right-sub",
      "default",
      "[t] \"indice droite\"; [n] text()",
      "self::*[@role=\"rightsub\"]",
      "not(contains(@grammar,\"combinatorics\"))"
    ],
    [
      "Rule",
      "right-sub",
      "default",
      "[t] \"indice droite\"; [m] children/*",
      "self::punctuated",
      "@role=\"rightsub\"",
      "not(contains(@grammar,\"combinatorics\"))"
    ],
    [
      "Rule",
      "empty-index",
      "default",
      "[p] (pause:medium)",
      "self::empty",
      "@role=\"rightsub\" or @role=\"rightsuper\" or @role=\"leftsub\" or @role=\"leftsuper\""
    ],
    [
      "Rule",
      "combinatorics",
      "default",
      "[n] children/*[2] (grammar:combinatorics); [n] children/*[1]; [n] children/*[4] (grammar:combinatorics)",
      "self::tensor",
      "name(children/*[3])=\"empty\"",
      "name(children/*[5])=\"empty\"",
      "children/*[1][text()=\"P\" or text()=\"C\"]"
    ],
    [
      "Rule",
      "choose",
      "CombinationPermutation_ChoosePermute",
      "[t] \"combinaison de\"; [n] children/*[2] (grammar:combinatorics); [t] \"parmi\"; [n] children/*[4] (grammar:combinatorics)",
      "self::tensor",
      "name(children/*[3])=\"empty\"",
      "name(children/*[5])=\"empty\"",
      "children/*[1][text()=\"C\"]"
    ],
    [
      "Rule",
      "permute",
      "CombinationPermutation_ChoosePermute",
      "[t] \"permutation de\"; [n] children/*[2] (grammar:combinatorics); [t] \"parmi\"; [n] children/*[4] (grammar:combinatorics)",
      "self::tensor",
      "name(children/*[3])=\"empty\"",
      "name(children/*[5])=\"empty\"",
      "children/*[1][text()=\"P\"]"
    ],
    [
      "Rule",
      "unit-singular",
      "default",
      "[t] text() (grammar:annotation=\"unit\":translate)",
      "self::identifier[@role=\"unit\"]"
    ],
    [
      "Rule",
      "unit-plural",
      "default",
      "[t] text() (grammar:annotation=\"unit\":translate:plural)",
      "self::identifier[@role=\"unit\"]",
      "not(contains(@grammar, \"singularUnit\"))"
    ],
    [
      "Rule",
      "unit-square",
      "default",
      "[n] children/*[1]; [t] \"carré\"",
      "self::superscript[@role=\"unit\"]",
      "children/*[2][text()=2]",
      "name(children/*[1])=\"identifier\""
    ],
    [
      "Rule",
      "unit-cubic",
      "default",
      "[n] children/*[1]; [t] \"cube\"",
      "self::superscript[@role=\"unit\"]",
      "children/*[2][text()=3]",
      "name(children/*[1])=\"identifier\""
    ],
    [
      "Rule",
      "unit-reciprocal",
      "default",
      "[t] \"réciproque\"; [n] children/*[1]",
      "self::superscript[@role=\"unit\"]",
      "name(children/*[1])=\"identifier\"",
      "name(children/*[2])=\"prefixop\"",
      "children/*[2][@role=\"negative\"]",
      "children/*[2]/children/*[1][text()=1]",
      "count(preceding-sibling::*)=0 or preceding-sibling::*[@role!=\"unit\"]"
    ],
    [
      "Rule",
      "unit-reciprocal",
      "default",
      "[t] \"par\"; [n] children/*[1] (grammar:singularUnit)",
      "self::superscript[@role=\"unit\"]",
      "name(children/*[1])=\"identifier\"",
      "name(children/*[2])=\"prefixop\"",
      "children/*[2][@role=\"negative\"]",
      "children/*[2]/children/*[1][text()=1]",
      "preceding-sibling::*[@role=\"unit\"]"
    ],
    [
      "Rule",
      "unit-reciprocal-multi",
      "default",
      "[t] \"par\"; [n] children/*[1] (grammar:singularUnit)",
      "self::superscript[@role=\"unit\"]",
      "name(children/*[1])=\"identifier\"",
      "name(children/*[2])=\"prefixop\"",
      "children/*[2][@role=\"negative\"]",
      "children/*[2]/children/*[1][text()=1]",
      "preceding-sibling::*[@role=\"unit\"]"
    ],
    [
      "Rule",
      "unit-combine",
      "default",
      "[m] children/*",
      "self::infixop[@role=\"unit\"]"
    ],
    [
      "Rule",
      "unit-combine-singular",
      "default",
      "[n] children/*[1]; [n] children/*[2] (grammar:singularUnit); [m] children/*[position()>2]",
      "self::infixop[@role=\"unit\"]",
      "name(children/*[1])=\"number\"",
      "children/*[1][text()=1]"
    ],
    [
      "Rule",
      "unit-divide",
      "default",
      "[n] children/*[1]; [t] \"par\"; [n] children/*[2] (grammar:singularUnit)",
      "self::fraction[@role=\"unit\"]"
    ],
    [
      "Rule",
      "currency",
      "default",
      "[m] children/*[position()>1]; [n] children/*[1];",
      "self::infixop",
      "contains(@annotation, \"clearspeak:unit\")",
      "children/*[1][@role=\"unit\"]",
      "CQFfirstCurrency"
    ],
    [
      "Rule",
      "currency",
      "Currency_Position",
      "[m] children/*",
      "self::infixop",
      "contains(@annotation, \"clearspeak:unit\")"
    ],
    [
      "SpecializedRule",
      "currency",
      "Currency_Position",
      "Currency_Prefix"
    ],
    [
      "Rule",
      "currency",
      "Currency_Prefix",
      "[n] children/*[last()]; [m] children/*[position()<last()]; ",
      "self::infixop",
      "contains(@annotation, \"clearspeak:unit\")",
      "children/*[last()][@role=\"unit\"]",
      "CQFlastCurrency"
    ]
  ],
  "annotators": [
    "simple",
    "unit"
  ]
}
