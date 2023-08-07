sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
], function (Controller, History) {
    "use strict";

    return Controller.extend("jdv.controller.ModoJogo", {
        onNavBack: function () {
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("overview", {}, true);
            }
        },
        onJogadorContraJogador: function () {
            // Navegar para a tela do jogo no modo Jogador contra Jogador
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("jogo2", {
                modo: "jogadorContraJogador"
            });
        },
        onJogadorContraRobo: function () {
            // Navegar para a tela do jogo no modo Jogador contra Robô
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("jogo", {
                modo: "jogadorContraRobo"
            });
        }
    });
});
