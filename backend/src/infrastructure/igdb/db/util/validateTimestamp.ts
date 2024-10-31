export default function validateTimestamp(ts) {
  return ts && ts >= -2147558400 && ts <= 2147558400
    ? new Date(ts * 1000)
    : null;
}
