const A = 'AAAA';
const C = 'CCCC';
const G = 'GGGG';
const T = 'TTTT';

var vueltas = 0;
var mutantDna = 0;
var countMatches = 0;

let dnasearch = {};
    
 dnasearch.checkIsMutante = (dnaJson, callback) =>{

    //busqueda Horizontal
    for(let dnaChain of dnaJson.dna){
        if(dnaChain.includes(A) || dnaChain.includes(C) || dnaChain.includes(G) || dnaChain.includes(T)){
            if(++mutantDna > 1){ 
                //Si ya hay mas de una coincidencia, guardo el registro 
                //y corto la ejecuci�n
               //TODO: guardar en la base de datos y salir 
            }

        }
    
    }

    //Cambiamos el orden la matriz para la busqueda vertical
    var dnaTranspose = transpose(dnaJson.dna);

    //busqueda vertical
    for(let dnaChain of dnaTranspose){
        //pasamos a string el array para poder comporar por substring 
        //al igual que el anterior
        let dnaString = dnaChain.join("");
        if(dnaString.includes(A) || dnaString.includes(C) || dnaString.includes(G) || dnaString.includes(T))
        {
            if(++mutantDna > 1){
               console.log('Hewstone, tenemos un mutante!')
            }
        }
    }

    var return1 = busquedaOblicua(0,0, dnaJson);

    callback(null, mutantDna);

}

function transpose(a) {
    return Object.keys(a[0]).map(function(c) {
        return a.map(function(r) { return r[c]; });
    });
}

function busquedaOblicua(itRow, itColumn, dnaJson){
    //Para el control principal, que va por columnas, debe buscar empezando la columna
    // N - 4, ya que se necesitan al menos 4 coincidencias.
    console.log('row:'+itRow+' - column:'+itColumn);
    console.log('vueltas: '+vueltas);
    
    if(itColumn < dnaJson.dna[0].length ){        
        //En el caso de las filas, si a�n no hay coincidencias y quedan 
        //menos de 4 filas, dejo de buscar en esa secuencia oblicua.
       if(itRow < dnaJson.dna.length ){
            if((dnaJson.dna[itRow + 1] != undefined && dnaJson.dna[itRow][itColumn] != undefined)){
                //si existen los indices
                console.log('Letra: '+dnaJson.dna[itRow][itColumn]);
                if(dnaJson.dna[itRow + 1][itColumn + 1] === dnaJson.dna[itRow][itColumn]){
                    
                    countMatches++;
                    if(countMatches === 3){
                        console.log('match 4!!');
                        //Aqu� ya ser�a el 4to match, 
                        
                        if(++mutantDna > 1){
                              //TODO: guardar en la base de datos y salir 
                        }
                        //reiniciamos el contador de coincidencias y hacemos la 
                        //llamada recursiva, para la siguiente escalera
                        countMatches = 0;
                        busquedaOblicua(itRow = 0, ++vueltas, dnaJson);
                    }else{
                        console.log('match < 3');
                         // si no, incrementamos el contador
                        
                        console.log('matches: '+countMatches);
                        busquedaOblicua(++itRow, ++itColumn, dnaJson);
                    }
                    
                }else if(dnaJson.dna[0].length ){
                    console.log('no match');
                   //Si aun faltan 4 columnas o mas, sigo recorriendo
                   busquedaOblicua(++itRow,++itColumn, dnaJson);
                }   
                
            }else
            {
                if(vueltas < dnaJson.dna[0].length)
                    busquedaOblicua(itRow = 0,++vueltas, dnaJson);
            }
            //vueltas++;
            console.log('back recursivity');
            return -1;
        }
        
    }
    
    return true;
}

module.exports = dnasearch;