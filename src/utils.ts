import { WalletName } from './typescript/cip30';
import { WalletInfo } from './store';
import { walletPrettyNames } from './wallets';
import { Cbor, CborUInt, CborArray } from '@harmoniclabs/cbor';

export function parseBalance(balance: string): number {
  // CIP-30 `getBalance` is a CBOR value: usually a single uint (coin only),
  // but it may also be an array [coin, ...multiAsset] when tokens are present.
  const cbor = Cbor.parse(balance);
  const coin =
    cbor instanceof CborUInt ? cbor :
    cbor instanceof CborArray && cbor.array[0] instanceof CborUInt ? cbor.array[0] :
    null;
  return coin === null ? 0 : Number(coin.num);
}

export function toWalletInfo(walletName: WalletName): WalletInfo {
  const ns = (globalThis as any)?.cardano ?? {};

  return {
    name: walletName,
    displayName: walletPrettyNames[walletName] ?? walletName,
    icon: ns[walletName]?.icon,
  };
}
