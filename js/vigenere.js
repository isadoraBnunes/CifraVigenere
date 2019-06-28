const alfabeto = "abcdefghijklmnopqrstuvwxyz"

document.getElementById("codificar").addEventListener('click', () => {
    let chave = document.querySelector("#chave").value;
    let texto = document.getElementById("texto").value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f\d\,\?\!\:\;\@\$\%\&\*\.\´\^\~]/g, "")
    let resultado = passo1(chave, texto, 1)
    document.getElementById("resultado").innerHTML = resultado;
});

document.getElementById("decodificar").addEventListener('click', () => {
    let chave = document.querySelector("#chave").value;
    let texto = document.getElementById("texto").value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f\d\,\?\!\:\;\@\$\%\&\*\.]/g, "")
    let resultado = passo1(chave, texto, 2)
    document.getElementById("resultado").innerHTML = resultado;
});

function passo1(chave, texto, modo=1) { //quebra o texto de acordo com a chave
let result = []
    let textoLimpo = texto.replace(/\ /g, "")
    let ciclos = textoLimpo.length / chave.length

    for (let i = 0; i < ciclos; i++) {
        result.push(textoLimpo.substr(i * chave.length,chave.length))
    }
    console.log(result) 
    if(modo == 1){
        return passo2C(chave, result, texto)
    }else{
        return passo2D(chave, result, texto)
    }
}

function passo2C(chave, wordArray, texto) { //faz a criptografia 
    let result = []
    let newchar = ''

    for (let i = 0; i < wordArray.length; i++) {
        let char1, char2, newWord = ""
        for (let j = 0; j < chave.length; j++) {
            char1 = wordArray[i].charAt(j)
            if(!!char1){
                char2 = chave.charAt(j)
                newchar = (alfabeto.indexOf(char1) + alfabeto.indexOf(char2)) % 26
                newWord += alfabeto[newchar]
            }
        }
        result.push(newWord)
    }
    console.log(result)
    return passo3(result,texto)
}

function passo2D(chave, wordArray, texto) { //faz a criptografia 
    let result = []
    let newchar = ''

    for (let i = 0; i < wordArray.length; i++) {
        let char1, char2, newWord = ""
        for (let j = 0; j < chave.length; j++) {
            char1 = wordArray[i].charAt(j)
            if(!!char1){
                char2 = chave.charAt(j)
                newchar = (alfabeto.indexOf(char1) - alfabeto.indexOf(char2) + 26) % 26
                newWord += alfabeto[newchar]
            }
        }
        console.log(result)
        result.push(newWord)
    }
    console.log(result)
    return passo3(result,texto)
}

function passo3(wordArray, texto) { // trata o espaço
    cryText = wordArray.join('')

    for (let i = 0; i < texto.length; i++) {
       if (texto.charAt(i) == " ") {
        cryText = cryText.slice(0, i) + " " + cryText.slice(i)
       }
    }
    return cryText
}
