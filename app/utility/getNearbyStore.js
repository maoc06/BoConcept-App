const calcDistance = (x1, y1, x2, y2) => {
  const Xm = Math.pow(x2 - x1, 2);
  const Ym = Math.pow(y2 - y1, 2);
  return Math.sqrt(Xm + Ym);
};

export const getNearbyStore = (currLatitude, currLongitude, stores) => {
  let MAX = Number.MAX_SAFE_INTEGER;
  let nearbyStore = null;

  for (const store of stores) {
    const {latitude, longitude} = store;

    const distance = calcDistance(
      currLatitude,
      currLongitude,
      latitude,
      longitude
    );

    if (distance <= MAX) {
      MAX = distance;
      nearbyStore = store;
    }
  }

  return nearbyStore;
};
