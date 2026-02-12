"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseBalance = parseBalance;
exports.toWalletInfo = toWalletInfo;
var wallets_1 = require("./wallets");
var cbor_1 = require("@harmoniclabs/cbor");
function parseBalance(balance) {
    var cbor = cbor_1.Cbor.parse(balance);
    if (cbor instanceof cbor_1.CborNegInt
        || cbor instanceof cbor_1.CborUInt)
        return Number(cbor.num);
    return 0;
}
;
function toWalletInfo(walletName) {
    var _a, _b, _c;
    var ns = (_a = globalThis === null || globalThis === void 0 ? void 0 : globalThis.cardano) !== null && _a !== void 0 ? _a : {};
    return {
        name: walletName,
        displayName: (_b = wallets_1.walletPrettyNames[walletName]) !== null && _b !== void 0 ? _b : walletName,
        icon: (_c = ns[walletName]) === null || _c === void 0 ? void 0 : _c.icon,
    };
}
;
