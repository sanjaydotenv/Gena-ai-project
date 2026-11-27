import "dotenv/config";

/**
 * @PORT if Port not accessible than it run
 */
if (!process.env.PORT) {
  console.log(`Environmental variable is not accessible PORT is not found`);
}

/**
 * @MONGO_URI if MONGO_URI not accessible than it run
 */

if (!process.env.MONGO_URI) {
  console.log(
    `Environmental variable is not accessible MONGO_URI is not found`,
  );
}

/**
 * @JWT_SECRET_ACCESS if JWT_SECRET_ACCESS not accessible than it run
 */

if (!process.env.MONGO_URI) {
  console.log(
    `Environmental variable is not accessible JWT_SECRET_ACCESS is not found`,
  );
}

/**
 * @JWT_SECRET_REFRESH if JWT_SECRET_REFRESH not accessible than it run
 */

if (!process.env.MONGO_URI) {
  console.log(
    `Environmental variable is not accessible JWT_SECRET_REFRESH is not found`,
  );
}

/**
 * @GROQ_API_KEY if GROQ_API_KEY not accessible than it run
 */

if (!process.env.GROQ_API_KEY) {
  console.log(
    `Environmental variable is not accessible, GROQ_API_KEY is not found`,
  );
}

// here are all the Environmental variables

export const _Config = {
  PORT: process.env.PORT || 5000,
  MONGO: process.env.MONGO_URI,
  JWT_ACCESS: process.env.JWT_SECRET_ACCESS,
  JWT_REFRESH: process.env.JWT_SECRET_REFRESH,
  GROQ_API_KEY: process.env.GROQ_API_KEY,
};
