# Analizador Descendente Predictivo Recursivo


Repositorio de la organizacion:  https://github.com/ULL-ESIT-PL-1617/analizador-dpr-oscar-angel-norberto.git

Heroku:  https://pacific-anchorage-70165.herokuapp.com/

Iaas :  http://10.6.128.37:8080


Descripción de la práctica: https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/practicas/practicarecdescparser.html

Aula virtual de la asignatura: https://campusvirtual.ull.es/1617/course/view.php?id=1148


Oscar Catari Gutierrez: http://alu0100825893.github.io/

Norberto García Gazpar http://alu0100611519.github.io/

Ángel Alberto Hamilton López http://alu0100888102.github.io/




### Gramática Inicial

1.  Σ = { ADDOP, MULOP, '(', ')', NUM, ',', ID, '=', 'begin', 'end', 'if', 'then', ';', 'while', 'do', 'call', 'procedure', 'const', 'var', '.' },
2.  V = {  expression, term, factor, condition, statement, functions, declaration, block, program}
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
    

###Ejemplo 1

    const pi = 3.14;
    var a;
    begin 
        a = 4;
        if a ==4 then a = 4 / 2
    end.

###Ejemplo 2

    const pi = 3.14;
    var a;
    a = pi.

###Ejemplo 3

    procedure b
    begin
    var b;
     b = b * 2
    end
    call b.

###Ejemplo 4

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
    
### Recursos

* [Apuntes: Programación Orientada a Objetos](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/apuntes/oop/)
* [Apuntes: Pruebas. Mocha](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/apuntes/pruebas/mocha.html)
* [Apuntes: Pruebas. Should](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/apuntes/pruebas/mocha.html#shouldl)
* [Apuntes: Integración Contínua. Travis](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/apuntes/pruebas/travis.html)
* [node-sass-middleware](https://github.com/sass/node-sass-middleware/blob/master/README.md)
