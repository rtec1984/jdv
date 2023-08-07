sap.ui.define([
    "sap/ui/core/mvc/Controller", "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox) {
        "use strict";

        return Controller.extend("jdv.controller.jogo", {
            onInit: function () {
                this.vez = 'x';
                this.jogadas = 0;
                this.placar = {
                    x: 0,
                    empates: 0,
                    o: 0,
                    jogos:0
                };
                this.atualizarPlacar();
            },
            onResetPlacar: function () {
                this.placar.x = 0;
                this.placar.o = 0;
                this.placar.empates = 0;
                this.placar.jogos = 0;
                this.atualizarPlacar();
            },          
            onClickCasa: function (oEvent) {
                //obter referencia do objeto que foi clicado
                let casa = oEvent.getSource();
                //obter imagem atual
                let url = casa.getSrc();
                //obter nome da imagem atual
                let filename = url.substring(url.lastIndexOf('.') - 1);
                //verifica o nome no console
                console.log(filename);
                //verifica se a imagem é branco
                if (filename == "w.png") {
                    //comando para adicionar imagem
                    casa.setSrc("../img/" + this.vez + ".png");
                    this.jogadas++;

                    //logica para verificar quem venceu
                    //desvio condicional
                    if (this.temVencedor() == true) {
                        //alert(this.vez + " venceu!");
                        MessageBox.information(this.vez + " venceu!", { title: "Vitória!"});
                        this.placar[this.vez]++;
                        this.placar.jogos++;
                        this.atualizarPlacar();
                        this.reiniciarJogo();
                    } else if (this.jogadas == 9) {
                        MessageBox.information("Deu velha!", { title: "Empate!"});
                        this.placar.empates++;
                        this.placar.jogos++;
                        this.atualizarPlacar();
                        this.reiniciarJogo();
                    } else {
                        if (this.vez == 'x') {
                            this.vez = 'o';
                        } else {
                            this.vez = 'x'
                        }
                        this.jogadaRoboIA();
                    }                    
                }                
            },
            jogadaRoboIA: function () {
                let melhorJogada = this.escolherMelhorJogada();
                if (melhorJogada != null) {
                    let casa = this.byId("casa" + melhorJogada);
                    casa.setSrc("../img/" + this.vez + ".png");
                    this.jogadas++;
                    if (this.temVencedor() == true) {
                        MessageBox.information(this.vez + " venceu!", { title: "Vitória!"});
                        this.placar[this.vez]++;
                        this.placar.jogos++;
                        this.atualizarPlacar();
                        this.reiniciarJogo();
                    } else if (this.jogadas == 9) {
                        MessageBox.information("Deu velha!", { title: "Empate!"});
                        this.placar.empates++;
                        this.placar.jogos++;
                        this.atualizarPlacar();
                        this.reiniciarJogo();
                    } else {
                        if (this.vez == 'x') {
                            this.vez = 'o';
                        } else {
                            this.vez = 'x'
                        }
                    }
                }
            },

            escolherMelhorJogada: function () {
                let casasVazias = [];
                for (let i = 1; i <= 9; i++) {
                    let casa = this.byId("casa" + i);
                    let url = casa.getSrc();
                    let filename = url.substring(url.lastIndexOf('.') - 1);
                    if (filename == "w.png") {
                        casasVazias.push(i);
                    }
                }

                // Verificar se há uma jogada vencedora para o robô
                for (let i = 0; i < casasVazias.length; i++) {
                    let casa = casasVazias[i];
                    let casaObj = this.byId("casa" + casa);
                    casaObj.setSrc("../img/" + this.vez + ".png");
                    if (this.temVencedor() == true) {
                        casaObj.setSrc("../img/w.png");
                        return casa;
                    }
                    casaObj.setSrc("../img/w.png");
                }

                // Verificar se há uma jogada que bloqueia o usuário de vencer
                let vezUsuario;
                if (this.vez == 'x') {
                    vezUsuario = 'o';
                } else {
                    vezUsuario = 'x';
                }
                for (let i = 0; i < casasVazias.length; i++) {
                    let casa = casasVazias[i];
                    let casaObj = this.byId("casa" + casa);
                    casaObj.setSrc("../img/" + vezUsuario + ".png");
                    if (this.temVencedor() == true) {
                        casaObj.setSrc("../img/w.png");
                        return casa;
                    }
                    casaObj.setSrc("../img/w.png");
                }

                // Escolher uma jogada aleatória se não houver jogadas vencedoras ou bloqueadoras
                if (casasVazias.length > 0) {
                    return casasVazias[Math.floor(Math.random() * casasVazias.length)];
                } else {
                    return null;
                }
            },

            temVencedor: function () {
                if (this.casasIguais(1, 2, 3) || this.casasIguais(4, 5, 6) || this.casasIguais(7, 8, 9) || this.casasIguais(1, 4, 7) || this.casasIguais(2, 5, 8) || this.casasIguais(3, 6, 9) || this.casasIguais(1, 5, 9) || this.casasIguais(3, 5, 7)) {
                    return true;
                }
            },
            casasIguais: function (a,b,c) {
                //obtenho objetos da tela
                let casaA = this.byId("casa" + a);
                let casaB = this.byId("casa" + b);
                let casaC = this.byId("casa" + c);
                //obtendo imagens da tela
                let imgA = casaA.getSrc();
                let imgB = casaB.getSrc();
                let imgC = casaC.getSrc();
                //obtendo os nomes das imagens
                let filenameA = imgA.substring(imgA.lastIndexOf('.') - 1);
                let filenameB = imgB.substring(imgB.lastIndexOf('.') - 1);
                let filenameC = imgC.substring(imgC.lastIndexOf('.') - 1);
                //verificação se as imagens são iguais
                //desvio condicional
                if((filenameA == filenameB) && (filenameB == filenameC) && (filenameA !== "w.png")){
                    return true;
                }
            },

            reiniciarJogo: function () {
              for(let i=1; i<=9; i++){
                  let casa = this.byId("casa" + i);
                  casa.setSrc("../img/w.png");
              }
              this.jogadas = 0;
              this.vez = 'x';
            },

            atualizarPlacar: function () {
              let placarTabela = this.byId("placarTabela");
              placarTabela.getItems()[0].getCells()[1].setText(this.placar.x);
              placarTabela.getItems()[1].getCells()[1].setText(this.placar.empates);
              placarTabela.getItems()[2].getCells()[1].setText(this.placar.o);
              placarTabela.getItems()[3].getCells()[1].setText(this.placar.jogos);
            }

        });
    });
