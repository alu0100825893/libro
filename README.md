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

   
    
    1. program → block '.'
    2. block → declaration functions statement
    3. declaration → (const' ID '=' NUM (',' ID '=' NUM) * ';')?  ('var' ID (',' ID ) * ';')?
    4. functions → ('procedure' ID 'begin' block 'end')*
    5. statement → ID '=' expression | 'call' ID | 'if' condition 'then' statement | 'while' condition 'do' statement
        | 'begin' statement (';' statement) * 'end'
    6. condition → expression COMPARISON expression
    7.  expression → term ( ADDOP term) *  
    8.  term → factor (MULOP factor) *
    9.  factor → '(' expression ')' | NUM | ID
    

Ejemplo 1

    const pi = 3.14;
    var a;
    begin 
        a = 4;
        if a ==4 then a = 4 / 2
    end.

Ejemplo 2

    const pi = 3.14;
    var a;
    a = pi.

Ejemplo 3

    procedure b
    begin
    var b;
     b = b * 2
    end
    call b.

Ejemplo 4

    var x;
    begin     
        a = 0;
        while x <= 10 do
        begin
         
          x = x + 1
        end;
        while x != 0 do
            x = x - 1
    end.