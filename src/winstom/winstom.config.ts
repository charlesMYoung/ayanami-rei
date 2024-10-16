import * as winston from 'winston';
import 'winston-daily-rotate-file';
const { combine, timestamp, printf } = winston.format;

const fileRotateRunTransport = new winston.transports.DailyRotateFile({
  filename: 'logs/run/rei-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d',
  level: 'info',
});

const fileRotateDebugTransport = new winston.transports.DailyRotateFile({
  filename: 'logs/debug/rei-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d',
  level: 'debug',
});

const fileRotateErrorTransport = new winston.transports.DailyRotateFile({
  filename: 'logs/error/rei-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d',
  level: 'error',
});

export default {
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    printf(({ level, message, context, timestamp }) => {
      return `${timestamp} [${context}] [${level.toUpperCase()}]- ${message}`;
    }),
  ),
  defaultMeta: { service: 'rei' },
  transports: [
    new winston.transports.Console({
      level: process.env.LOG_LEVEL,
      format: combine(
        winston.format.colorize({
          all: true,
        }),
        timestamp(),
        printf(({ level, message, timestamp, context }) => {
          return `${timestamp} [${level}] ${context} -  ${message}`;
        }),
      ),
    }),
    fileRotateRunTransport,
    fileRotateDebugTransport,
    fileRotateErrorTransport,
  ],
};
