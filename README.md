# Solución a la Práctica Evaluar Analizador Descendente Predictivo Recursivo

* [Campus PL1617: Práctica: Evaluar Analizador Descendente Predictivo Recursivo](https://campusvirtual.ull.es/1617/mod/assign/view.php?id=195888)
* [Descripción de la Práctica: Analizador Descendente Predictivo Recursivo](http://crguezl.github.io/pl-html/node26.html)
* [Analizadores Descendentes Recursivos](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/apuntes/parsing/recursivodescendente/)

## Definición de la Práctica

### Forma de trabajo

* Use su portátil o su cuenta en c9 para llevar a cabo los objetivos planteados.
* Esta práctica se divide en objetivos o hitos:  indique al profesor  cuando ha terminado y suba los enlaces a los repos y despliegues.

### Descripción del Código de la Práctica

1. [Eloquent JS: The Secret Life of Objects. Lying Out a Table](http://eloquentjavascript.net/06_object.html##h_36C2FHHi44)
2. [Repo original de esta práctica](https://github.com/ULL-ESIT-DSI-1617/oop-eloquentjs-example)

### Hitos

1. Use el repo de GitHub dado por la asignación de esta tarea. 
2. Separe las clases `UnderlinedCell`, `TexCell`, etc. en distintos ficheros exportando los objetos adecuados
3. Reescriba las clases usando ECMA6
4. Añada pruebas para cada una de las clases `UnderlinedCell`, `TexCell`, etc
5. Añada integración continua usando Travis
6. Añada a su `README.md` un badge Travis como este:
[![Build Status](https://travis-ci.org/crguezl/mocha-chai-sinon--example.svg?branch=travis)](https://travis-ci.org/crguezl/mocha-chai-sinon--example)
indicando el estado de las pruebas en Travis y enlazando a las mismas. 
7. Entrege los enlaces al repo en GitHub y a Travis


### Recursos

* [Apuntes: Programación Orientada a Objetos](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/apuntes/oop/)
* [Apuntes: Pruebas. Mocha](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/apuntes/pruebas/mocha.html)
* [Apuntes: Pruebas. Should](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/apuntes/pruebas/mocha.html#shouldl)
* [Apuntes: Integración Contínua. Travis](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/apuntes/pruebas/travis.html)
* [node-sass-middleware](https://github.com/sass/node-sass-middleware/blob/master/README.md)

### Gramática Inicial

1.  Σ = { ADDOP, MULOP, '(', ')', NUM, ',', ID, '=' },
2.  V = {  comma, expression, term, factor, assign }
3.  Productions:

    1. assign → ID '=' assing | comma
    1. comma  → expression (',' expression)*
    1.  expression → term ( ADDOP term)* 
    2.  term → factor (MULOP factor)*
    3.  factor → '(' assign ')' | '(' comma ')' | NUM | ID
    
    1. program → block '.'
    1. block → declaration (';' declaration) * 
    1. declaration → const' ID '=' NUM (',' ID '=' NUM) * | 'var' ID (',' ID ) * | 'procedure' ID 'begin' block 'end' | statement
    1. statement → ID '=' expression | 'call' ID | 'if' condition 'then' statement | 'while' condition 'do' statement
        | 'begin' statement (';' statement) * 'end'
    1. condition → expression COMPARISON expression
    1.  expression → term ( ADDOP term) *  
    2.  term → factor (MULOP factor) *
    3.  factor → '(' expression ')' | NUM | ID
    
    1. program → block '.'
    1. block → declaration functions statement
    1. declaration → (const' ID '=' NUM (',' ID '=' NUM) *)?  ('var' ID (',' ID ) *)?
    1. functions → ('procedure' ID 'begin' block 'end')*
    
    1. statement → ID '=' expression | 'call' ID | 'if' condition 'then' statement | 'while' condition 'do' statement
        | 'begin' statement (';' statement) * 'end'
    1. condition → expression COMPARISON expression
    1.  expression → term ( ADDOP term) *  
    2.  term → factor (MULOP factor) *
    3.  factor → '(' expression ')' | NUM | ID
    
    const a = 8;
    var x, squ;

    procedure square;
    begin
       squ = x * x
    end;
    
    begin
       x := 1;
       while x <= 10 do
       begin
          call square;
          ! squ;
          x := x + 1
       end
    end.