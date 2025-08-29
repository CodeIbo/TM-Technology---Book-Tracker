import { CorsOptions } from 'cors';

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = (process.env.ALLOWED_ORIGIN || '')
      .split(',')
      .map((o) => o.trim())
      .filter(Boolean);
    const isDev = ['development', 'test'].includes(process.env.NODE_ENV as string);

    if (isDev) {
      return callback(null, true);
    }

    if (!origin) {
      return callback(new Error('Not allowed by CORS (no origin)'));
    }

    const isAllowed = allowedOrigins.some((allowed) => {
      try {
        const pattern = new RegExp('^https?:\\/\\/(.*\\.)?' + allowed.replace(/\./g, '\\.') + '$');
        return pattern.test(origin);
      } catch {
        return false;
      }
    });

    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error(`Not allowed by CORS: ${origin}`));
    }
  },

  credentials: true,
  allowedHeaders: ['Content-Type'],
  methods: ['GET', 'POST', 'PATCH'],
};

export default corsOptions;
