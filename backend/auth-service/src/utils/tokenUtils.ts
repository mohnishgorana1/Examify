// utils/tokenUtils.ts

// Converts time string like "15m", "7d" to milliseconds (for cookies)
export const getMs = (time: string): number => {
  const match = time.match(/^(\d+)([smhd])$/);
  if (!match) return 0;
  const val = parseInt(match[1]);
  const unit = match[2];
  switch (unit) {
    case "s":
      return val * 1000;
    case "m":
      return val * 60 * 1000;
    case "h":
      return val * 60 * 60 * 1000;
    case "d":
      return val * 24 * 60 * 60 * 1000;
    default:
      return 0;
  }
};

// Converts time string to seconds (for epoch expiry timestamps)
export const getExpirySeconds = (time: string): number => {
  const match = time.match(/^(\d+)([smhd])$/);
  if (!match) return 0;
  const val = parseInt(match[1]);
  const unit = match[2];
  switch (unit) {
    case "s":
      return val;
    case "m":
      return val * 60;
    case "h":
      return val * 60 * 60;
    case "d":
      return val * 24 * 60 * 60;
    default:
      return 0;
  }
};
