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
                return   mutantDna;
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
        if(dnaString.includes(A) || dnaString.includes(C) || dnaString.includes(G) || dnaString.includes(T)){
            if(++mutantDna > 1){
			   return   mutantDna;
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
    //Para el control principal, que va por columnas, debe buscar empezando por la columna
    
    if(vueltas < dnaJson.dna[0].length && vueltas <= (dnaJson.dna[0].length - 4)  ){        
        //En el caso de las filas, si a�n no hay coincidencias y quedan 
       if(itRow < dnaJson.dna.length ){
            if((dnaJson.dna[itRow + 1] != undefined && dnaJson.dna[itRow][itColumn] != undefined)){
                //si existen los indices
                if(dnaJson.dna[itRow + 1][itColumn + 1] === dnaJson.dna[itRow][itColumn]){
                    
                    countMatches++;
                    if(countMatches === 3){
                        
                        if(++mutantDna > 1){
                            return   mutantDna;
            
                        }
                        //reiniciamos el contador de coincidencias y hacemos la 
                        //llamada recursiva, para la siguiente escalera
                        countMatches = 0;
                        busquedaOblicua(itRow = 0, ++vueltas, dnaJson);
                    }else{
                        
                        busquedaOblicua(++itRow, ++itColumn, dnaJson);
                    }
                    
                }else if(dnaJson.dna[0].length ){
                    
                   busquedaOblicua(++itRow,++itColumn, dnaJson);
                }   
                
            }else
            {
				countMatches = 0;
                if(vueltas < dnaJson.dna[0].length)
                    busquedaOblicua(itRow = 0,++vueltas, dnaJson);
				
            }
            
            return -1;
        }
        
    }
    
    return true;
}

module.exports = dnasearch;