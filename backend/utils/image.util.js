exports.buildImageUrls = (vehicleId, count, limit = null) => {
  const total = limit ? Math.min(count, limit) : count;
  const urls = [];

  for (let i = 1; i <= total; i++) {
    urls.push(`/api/vehicles/${vehicleId}/images/${i}`);
  }

  return urls;
};
