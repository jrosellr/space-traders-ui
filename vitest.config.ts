// Learn more about Vitest configuration options at https://vitest.dev/config/

import {configDefaults, defineConfig} from 'vitest/config';

export default defineConfig({
  test: {
    include: [
      ...configDefaults.include
    ]
  },
});
