/** @jest-config-loader esbuild-register */

import type { Config } from 'jest';
import nextJest from 'next/jest.js';

// https://nextjs.org/docs/app/building-your-application/testing/jest
const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['<rootDir>/playwright/'],
};

export default createJestConfig(config);
