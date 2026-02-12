"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStore = void 0;
var immer_1 = require("immer");
var zustand_1 = require("zustand");
var cip30_1 = require("../typescript/cip30");
var utils_1 = require("../utils");
var uint8array_utils_1 = require("@harmoniclabs/uint8array-utils");
var crypto_1 = require("@harmoniclabs/crypto");
var defaults = {
    isConnecting: false,
    isConnected: false,
    detectedWallets: [],
    address: null,
    lovelaceBalance: null,
    api: null,
    selectedWallet: null,
    connectedWallet: null,
    network: null,
    isRefetchingBalance: false,
    rewardAddress: null,
};
exports.useStore = (0, zustand_1.default)()(function (set, get) { return (__assign(__assign({}, defaults), { disconnect: function () {
        set(function (prev) {
            return __assign(__assign({}, defaults), { 
                // Keep detected wallets
                detectedWallets: prev.detectedWallets });
        });
    }, refetchBalance: function () { return __awaiter(void 0, void 0, void 0, function () {
        var api, balance, lovelace;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    api = get().api;
                    if (api === null)
                        return [2 /*return*/];
                    set((0, immer_1.default)(function (draft) {
                        draft.isRefetchingBalance = true;
                    }));
                    return [4 /*yield*/, api.getBalance()];
                case 1:
                    balance = _a.sent();
                    lovelace = (0, utils_1.parseBalance)(balance);
                    set((0, immer_1.default)(function (draft) {
                        draft.isRefetchingBalance = false;
                        draft.lovelaceBalance = lovelace;
                    }));
                    return [2 /*return*/];
            }
        });
    }); }, getDetectedWallets: function () { return __awaiter(void 0, void 0, void 0, function () {
        var ns;
        return __generator(this, function (_a) {
            if (typeof window === 'undefined' || !window.cardano) {
                return [2 /*return*/];
            }
            ns = window.cardano;
            set((0, immer_1.default)(function (draft) {
                draft.detectedWallets = Object.keys(ns)
                    .filter(function (ns) { return Object.values(cip30_1.WalletName).includes(ns); })
                    .map(function (n) { return (0, utils_1.toWalletInfo)(n); });
            }));
            return [2 /*return*/];
        });
    }); }, connect: function (walletName, localStorageKey) { return __awaiter(void 0, void 0, void 0, function () {
        var api_1, rawAddress, rewardAddress_1, buf, addressBytes_1, balance, decodedBalance_1, bechAddr_1, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    set((0, immer_1.default)(function (draft) {
                        draft.isConnecting = true;
                        draft.selectedWallet = (0, utils_1.toWalletInfo)(walletName);
                    }));
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 10, , 11]);
                    // Exit early if the Cardano dApp-Wallet Web Bridge (CIP 30) has not been injected
                    // This can happen in a SSR scenario for example
                    if (typeof window === 'undefined' || !window.cardano) {
                        throw Error('window.cardano is undefined');
                    }
                    return [4 /*yield*/, window.cardano[walletName].enable()];
                case 2:
                    api_1 = _a.sent();
                    return [4 /*yield*/, api_1.getChangeAddress()];
                case 3:
                    rawAddress = _a.sent();
                    if (!!rawAddress) return [3 /*break*/, 5];
                    return [4 /*yield*/, api_1.getUsedAddresses()];
                case 4:
                    rawAddress = (_a.sent())[0];
                    _a.label = 5;
                case 5:
                    if (!!rawAddress) return [3 /*break*/, 7];
                    return [4 /*yield*/, api_1.getUnusedAddresses()];
                case 6:
                    rawAddress = (_a.sent())[0];
                    _a.label = 7;
                case 7: return [4 /*yield*/, api_1.getRewardAddresses()];
                case 8:
                    rewardAddress_1 = (_a.sent())[0];
                    if (rewardAddress_1) {
                        buf = (0, uint8array_utils_1.fromHex)(rewardAddress_1);
                        rewardAddress_1 = (0, crypto_1.encodeBech32)(buf[0] === cip30_1.NetworkId.MAINNET ? 'stake' : 'stake_test', buf.slice(1));
                    }
                    addressBytes_1 = (0, uint8array_utils_1.fromHex)(rawAddress);
                    return [4 /*yield*/, api_1.getBalance()];
                case 9:
                    balance = _a.sent();
                    decodedBalance_1 = (0, utils_1.parseBalance)(balance);
                    bechAddr_1 = (0, crypto_1.encodeBech32)(addressBytes_1[0] === cip30_1.NetworkId.MAINNET ? 'addr' : 'addr_test', addressBytes_1.slice(1));
                    localStorage.setItem(localStorageKey, walletName);
                    set((0, immer_1.default)(function (draft) {
                        draft.isConnecting = false;
                        draft.isConnected = true;
                        draft.api = api_1;
                        draft.lovelaceBalance = decodedBalance_1;
                        draft.rewardAddress = rewardAddress_1;
                        draft.address = bechAddr_1;
                        draft.network = addressBytes_1[0];
                        draft.connectedWallet = (0, utils_1.toWalletInfo)(walletName);
                    }));
                    return [3 /*break*/, 11];
                case 10:
                    e_1 = _a.sent();
                    console.error(e_1);
                    set((0, immer_1.default)(function (draft) {
                        draft.isConnecting = false;
                        draft.selectedWallet = null;
                    }));
                    return [3 /*break*/, 11];
                case 11: return [2 /*return*/];
            }
        });
    }); } })); });
