import { useIpInfos } from '@/hooks/useIp';

const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
};

export const useGeoMetrics = (ip: string) => {
  const ipInfos = useIpInfos(ip);
  const hostInfos = useIpInfos('host');

  const fromCoords: [number, number] = [ipInfos.longitude, ipInfos.latitude];
  const toCoords: [number, number] = [hostInfos.longitude, hostInfos.latitude];

  // Calculate the midpoint
  const midpoint: [number, number] = [
    (fromCoords[0] + toCoords[0]) / 2,
    (fromCoords[1] + toCoords[1]) / 2,
  ];

  // Calculate the distance
  const distance = calculateDistance(
    fromCoords[1],
    fromCoords[0],
    toCoords[1],
    toCoords[0],
  );

  return { distance, midpoint, fromCoords, toCoords };
};
