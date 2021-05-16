class ValidaCPF {
    constructor(cpfEnviado) {
        Object.defineProperty(this, 'cpfLimpo', {
            writable: false,
            Enumerable: false,
            configurable: false,
            value: cpfEnviado.replace(/\D+/g, '')
        });
    }

    eSequencia() {
        return this.cpfLimpo.charAt(0).repeat(11) === this.cpfLimpo;
    }

    geraNovoCPF() {
        const cpfSemDigito = this.cpfLimpo.slice(0, -2);
        const digito1 = ValidaCPF.geraDigito(cpfSemDigito);
        const digito2 = ValidaCPF.geraDigito(cpfSemDigito + digito1);
        this.geraNovoCPF = cpfSemDigito + digito1 + digito2;

    }

    static geraDigito(cpfSemDigito) {
        let total = 0;
        let reverso = cpfSemDigito.length + 1;
        for (let stringNumerica of cpfSemDigito) {
            total += reverso * Number(stringNumerica);
            reverso--;
        }

        const digito = 11 - (total % 11);
        return digito <= 9 ? String(digito) : '0';
    }

    valida(){
        if(!this.cpfLimpo) return false;
        if(typeof this.cpfLimpo !== 'string') return 'é numero, não texto';
        if(this.cpfLimpo.length !== 11) return 'tamanho errado';
        if(this.eSequencia()) return 'é um sequencia numerica';
        if (!this.geraNovoCPF());

        return this.geraNovoCPF === this.cpfLimpo;
    }
}

