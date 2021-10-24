import { useEffect, useState } from "react";
import { Marker } from "../shared/types";

export const useChampionshipMarkers = (): { markers: Marker[] } => {
  const [markers, setMarkers] = useState<Marker[]>([]);

  useEffect(() => {
    fetch("/api/markers")
      .then((response) => response.json())
      .then((response) => setMarkers(response))
      .catch(() => setMarkers([]));
  }, []);

  return {
    markers,
  };
};
