import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useStore } from '../store';
import { NetworkId, WalletName } from '../typescript/cip30';

// 29-byte Shelley addresses: header byte carries (type << 4) | networkId.
const BASE_MAINNET = '01' + 'ab'.repeat(28);
const REWARD_MAINNET = 'e1' + 'cd'.repeat(28);

const api = {
  getBalance: async () => '1a94b130b6',
  getChangeAddress: async () => BASE_MAINNET,
  getUsedAddresses: async () => [],
  getUnusedAddresses: async () => [],
  getRewardAddresses: async () => [REWARD_MAINNET],
};

describe('useCardanoWallet connect', () => {
  beforeEach(() => {
    (globalThis as any).window = {
      cardano: {
        eternl: { enable: async () => api, name: 'eternl', icon: 'icon://eternl' },
      },
    };
    (globalThis as any).localStorage = {
      setItem: vi.fn(),
      getItem: () => null,
      removeItem: vi.fn(),
    };
  });

  afterEach(() => {
    useStore.getState().disconnect();
  });

  it('connects, derives mainnet addresses and decodes the bare uint balance', async () => {
    await useStore.getState().connect(WalletName.ETERNL, 'cardano-wallet-name');

    const state = useStore.getState();
    expect(state.isConnected).toBe(true);
    expect(state.api).toBe(api);
    expect(state.connectedWallet?.name).toBe('eternl');
    expect(state.network).toBe(NetworkId.MAINNET);
    expect(state.lovelaceBalance).toBe(2494640310);
    expect(state.address).toMatch(/^addr1/);
    expect(state.rewardAddress).toMatch(/^stake1/);
    expect((globalThis as any).localStorage.setItem).toHaveBeenCalledWith('cardano-wallet-name', 'eternl');
  });
});
