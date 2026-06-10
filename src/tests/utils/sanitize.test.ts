import { describe, expect, it } from 'vitest';
import { sanitizeText } from '../../utils/sanitize';

describe('sanitizeText', () => {
  it('elimina espacios y caracteres peligrosos', () => {
    expect(sanitizeText('  <script>alert</script>  ')).toBe('scriptalert/script');
  });
});
