"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletName = exports.NetworkId = void 0;
var NetworkId;
(function (NetworkId) {
    NetworkId[NetworkId["TESTNET"] = 0] = "TESTNET";
    NetworkId[NetworkId["MAINNET"] = 1] = "MAINNET";
})(NetworkId || (exports.NetworkId = NetworkId = {}));
var WalletName;
(function (WalletName) {
    WalletName["NAMI"] = "nami";
    WalletName["ETERNL"] = "eternl";
    WalletName["FLINT"] = "flint";
    WalletName["BEGIN"] = "begin";
    WalletName["GERO"] = "gero";
    WalletName["TYPHON"] = "typhoncip30";
    WalletName["LACE"] = "lace";
    WalletName["VESPR"] = "vespr";
})(WalletName || (exports.WalletName = WalletName = {}));
