/*global QUnit*/

sap.ui.define([
	"jdv/controller/jogo.controller"
], function (Controller) {
	"use strict";

	QUnit.module("jogo Controller");

	QUnit.test("I should test the jogo controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
