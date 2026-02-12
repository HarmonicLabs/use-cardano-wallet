import { WalletName } from './typescript/cip30';
import { WalletInfo } from './store';
import { walletPrettyNames } from './wallets';
import { Cbor, CborNegInt, CborUInt } from '@harmoniclabs/cbor';

export function parseBalance( balance: string): number
{
  const cbor = Cbor.parse( balance );
  if(
    cbor instanceof CborNegInt
    || cbor instanceof CborUInt
  ) return Number( cbor.num );
  return 0;
};

export function toWalletInfo(walletName: WalletName): WalletInfo
{
  const ns = (globalThis as any)?.cardano ?? {};

  return {
    name: walletName,
    displayName: walletPrettyNames[walletName] ?? walletName,
    icon: ns[walletName]?.icon,
  };
};
