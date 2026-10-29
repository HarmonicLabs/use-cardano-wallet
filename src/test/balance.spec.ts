import { describe, expect, it } from 'vitest';
import { parseBalance } from '../utils';

describe('parseBalance', () => {
  it('decodes a bare uint32 coin balance', () => {
    expect(parseBalance('1a94b130b6')).toBe(2494640310);
  });

  it('decodes a bare uint64 coin balance', () => {
    expect(parseBalance('1b00000001dc87463b')).toBe(7994820155);
  });

  it('decodes an array balance (coin + assets)', () => {
    expect(
      parseBalance(
        '821a0510379ea1581cceb8a6f66d8abf778e111ffb982626e6e795d8ef15e7261ea98738d2a14d4d61727342697264733732383001'
      )
    ).toBe(84948894);
  });

  it('returns 0 for non-coin CBOR', () => {
    expect(parseBalance('f5')).toBe(0);
  });
});
