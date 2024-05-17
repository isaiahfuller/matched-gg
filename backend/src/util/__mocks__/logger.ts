import { Logger } from 'pino';

const mockLogger = {
  debug: jest.fn(),
  error: jest.fn(),
  fatal: jest.fn(),
  info: jest.fn(),
  trace: jest.fn(),
  warn: jest.fn(),
} as unknown as Logger;

export default mockLogger;
