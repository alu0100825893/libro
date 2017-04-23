  Object.constructor.prototype.error = function(message, t) {
    t = t || this;
    t.name = "SyntaxError";
    t.message = message;
    throw treturn;
  };

  RegExp.prototype.bexec = function(str) {
    var i, m;
    i = this.lastIndex;
    m = this.exec(str);
    if (m && m.index === i) {
      return m;
    }
    return null;
  };

  String.prototype.tokens = function() {
    var RESERVED_WORD, from, getTok, i, key, m, make, n, result, rw, tokens, value;
    from = void 0;
    i = 0;
    n = void 0;
    m = void 0;
    result = [];
    tokens = {
      WHITES: /\s+/g,
      ID: /[a-zA-Z_]\w*/g,
      NUM: /\b\d+(\.\d*)?([eE][+-]?\d+)?\b/g,
      STRING: /('(\\.|[^'])*'|"(\\.|[^"])*")/g,
      ONELINECOMMENT: /\/\/.*/g,
      MULTIPLELINECOMMENT: /\/[*](.|\n)*?[*]\//g,
      COMPARISONOPERATOR: /[<>=!]=|[<>]/g,
      ONECHAROPERATORS: /([=()&|;:,{}[\]])/g,
      ADDOP: /[+-]/g,
      MULTOP: /[*\/]/g
    };
    RESERVED_WORD = {
      "if": "IF",
      then: "THEN",
      while: "WHILE",
      do: "DO",
      call: "CALL",
      begin: "BEGIN",
      end: "END",
      const: "CONST",
      var: "VAR",
      procedure: "PROCEDURE"
    };
    make = function(type, value) {
      return {
        type: type,
        value: value,
        from: from,
        to: i
      };
    };
    getTok = function() {
      var str;
      str = m[0];
      i += str.length;
      return str;
    };
    if (!this) {
      return;
    }
    while (i < this.length) {
      for (key in tokens) {
        value = tokens[key];
        value.lastIndex = i;
      }
      from = i;
      if (m = tokens.WHITES.bexec(this) || (m = tokens.ONELINECOMMENT.bexec(this)) || (m = tokens.MULTIPLELINECOMMENT.bexec(this))) {
        getTok();
      } else if (m = tokens.ID.bexec(this)) {
        rw = RESERVED_WORD[m[0]];
        if (rw) {
          result.push(make(rw, getTok()));
        } else {
          result.push(make("ID", getTok()));
        }
      } else if (m = tokens.NUM.bexec(this)) {
        n = +getTok();
        if (isFinite(n)) {
          result.push(make("NUM", n));
        } else {
          make("NUM", m[0]).error("Bad number");
        }
      } else if (m = tokens.STRING.bexec(this)) {
        result.push(make("STRING", getTok().replace(/^["']|["']$/g, "")));
      } else if (m = tokens.COMPARISONOPERATOR.bexec(this)) {
        result.push(make("COMPARISON", getTok()));
      } else if (m = tokens.ADDOP.bexec(this)) {
        result.push(make("ADDOP", getTok()));
      } else if (m = tokens.MULTOP.bexec(this)) {
        result.push(make("MULTOP", getTok()));
      } else if (m = tokens.ONECHAROPERATORS.bexec(this)) {
        result.push(make(m[0], getTok()));
      } else {
        throw "Syntax error near '" + (this.substr(i)) + "'";
      }
    }
    return result;
  };

  var parse = function(input) {
    var condition, expression, factor, lookahead, match, statement, statements, term, tokens, tree;
    var declaration, block;
    tokens = input.tokens();
    lookahead = tokens.shift();
    match = function(t) {
      if (lookahead.type === t) {
        lookahead = tokens.shift();
        if (typeof lookahead === "undefined") {
          lookahead = null;
        }
      } else {
        throw ("Syntax Error. Expected " + t + " found '") + lookahead.value + "' near '" + input.substr(lookahead.from) + "'";
      }
    };
    
    block = function() {
      var left, result, right, type;
      
      left = [declaration()];
      while (lookahead && lookahead.type === ";") {
        match(";");
      
        left.push(declaration());
      }
 
      result = {
        type: "BLOCK",
        block: left
      };
      return result;
    };
    
    declaration = function() {
      var left, result, right;
      result = {};
      
      if (lookahead && lookahead.type === "CONST") {
        var constants = [];
        match("CONST");
        
        left = {}
        left["ID"] = lookahead.value;
        match("ID");
        match("=");
        left["value"] = lookahead.value;
        match("NUM");
        constants.push(left);
        
        while (lookahead && lookahead.type === ",") {
          match(",");
          
          left = {};
          left["ID"] = lookahead.value;
          match("ID");
          match("=");
          left["value"] = lookahead.value;
          match("NUM");
          constants.push(left);
        }
        
        result["CONST"] = constants;
      } else if (lookahead && lookahead.type === "VAR") {
          var variables = [];
          match("VAR");  
          
          left = {}
          left["ID"] = lookahead.value;
          match("ID");
          variables.push(left);
          
          while (lookahead && lookahead.type === ",") {
            match(",");
            
            left = {};
            left["ID"] = lookahead.value;
            match("ID");
            variables.push(left);
          }
          
          result["VARIABLES"] = variables;
      } else if (lookahead && lookahead.type === "PROCEDURE") {
        match("PROCEDURE");
        left = lookahead.value;
        match("ID");
        match("BEGIN");
        right = block();
        match("END");
        
        result = {
          type: "PROCEDURE",
          id: left,
          block: right
        };
      } else if (lookahead) {
          left = statement();
          result = {
            type: "LEFT",
            value: left
          };
        
      } else {
          throw "Syntax Error. Expected identifier but found " + (lookahead ? lookahead.value : "end of input") + (" near '" + (input.substr(lookahead.from)) + "'");
        }
        return result;
    }
    
    statement = function() {
      var left, result, right;
      result = null;
      if (lookahead && lookahead.type === "ID") {
        left = {
          type: "ID",
          value: lookahead.value
        };
        match("ID");
        match("=");
        right = expression();
        result = {
          type: "=",
          left: left,
          right: right
        };
      } else if (lookahead && lookahead.type === "WHILE") {
          match("WHILE");
          left = condition();
          match("DO");
          right = statement();
          result = {
            type: "WHILEDO",
            left: left,
            right: right
          };
      } else if (lookahead && lookahead.type === "IF") {
        match("IF");
        left = condition();
        match("THEN");
        right = statement();
        result = {
          type: "IF",
          left: left,
          right: right
        };
      } else if (lookahead && lookahead.type === "CALL") {
          match("CALL");
          result = {
            type: "CALL",
            value: lookahead.value
          };
          match("ID");
      } else if (lookahead && lookahead.type === "BEGIN") {
          match("BEGIN");
          left = [statement()];
          
          while (lookahead && lookahead.type === ";") {
            match(";");
            left.push(statement());
          }
          if (left.length === 1) {
            left = left[0];
          } 
          
          match("END");
          result = {
            type: "BEGINEND",
            statement: left
          };
      } else {
          throw "Syntax Error. Expected identifier but found " + (lookahead ? lookahead.value : "end of input") + (" near '" + (input.substr(lookahead.from)) + "'");
        }
        return result;
    };
    
    condition = function() {
      var left, result, right, type;
      left = expression();
      type = lookahead.value;
      match("COMPARISON");
      right = expression();
      result = {
        type: type,
        left: left,
        right: right
      };
      return result;
    };
    
    expression = function() {
      var result, right, type;
      result = term();
      while (lookahead && lookahead.type === "ADDOP") {
        type = lookahead.value;
        match("ADDOP");
        right = term();
        result = {
          type: type,
          left: result,
          right: right
        };
      }
      return result;
    };
    term = function() {
      var result, right, type;
      result = factor();
      while (lookahead && lookahead.type === "MULTOP") {
        type = lookahead.value;
        match("MULTOP");
        right = factor();
        result = {
          type: type,
          left: result,
          right: right
        };
      }
      return result;
    };
    factor = function() {
      var result;
      result = null;
      if (lookahead.type === "NUM") {
        result = {
          type: "NUM",
          value: lookahead.value
        };
        match("NUM");
      } else if (lookahead.type === "ID") {
        result = {
          type: "ID",
          value: lookahead.value
        };
        match("ID");
      } else if (lookahead.type === "(") {
        match("(");
        result = expression();
        match(")");
      } else {
        throw "Syntax Error. Expected number or identifier or '(' but found " + (lookahead ? lookahead.value : "end of input") + " near '" + input.substr(lookahead.from) + "'";
      }
      return result;
    };

    tree = block(input);
    if (lookahead != null) {
      throw "Syntax Error parsing statements. " + "Expected 'end of input' and found '" + input.substr(lookahead.from) + "'";
    }
    return tree;
  };
