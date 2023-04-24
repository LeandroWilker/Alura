const nome = document.querySelector('[data-nome]');

const adicionar = () => {

    const seuNome = window.prompt('Qual seu nome ?');

    if(seuNome == "") {
        window.alert('você precisa digitar seu nome! tente novamente.')
    }
    else if(seuNome == null) {
        nome.innerHTML = `Bem Vindo!`
    }
    else {
        nome.innerHTML = `Olá, ${seuNome} Seja Bem Vindo!`
    }

}

