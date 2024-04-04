window.onerror = function (message, source, lineno, colno, error) {
    console.error('Chyba: ' + message);
    console.error('Zdroj: ' + source);
    console.error('Řádek: ' + lineno);
    console.error('Sloupec: ' + colno);
};