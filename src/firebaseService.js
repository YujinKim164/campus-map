import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

// 현재 시간 기준으로 장소가 운영 중인지 확인하는 함수
const isOpenNow = (operatingHours) => {
  const now = new Date();
  const currentDay = now.getDay();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  const todayHours = operatingHours[currentDay];
  if (!todayHours) return false;

  const [start, end] = todayHours.split("-");
  const [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);

  const startTime = new Date();
  startTime.setHours(startHour, startMinute, 0);

  const endTime = new Date();
  endTime.setHours(endHour, endMinute, 0);

  return now >= startTime && now <= endTime;
};

export const fetchOpenPlaces = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "Buildings"));
    const openPlaces = [];

    for (const buildingDoc of querySnapshot.docs) {
      const placesSnapshot = await getDocs(
        collection(db, `Buildings/${buildingDoc.id}/places`)
      );

      placesSnapshot.docs.forEach((placeDoc) => {
        const placeData = placeDoc.data();
        if (isOpenNow(placeData.operating_hours)) {
          openPlaces.push({
            id: placeDoc.id,
            buildingId: buildingDoc.id,
            ...placeData,
          });
        }
      });
    }

    return openPlaces;
  } catch (error) {
    console.error("Error fetching places: ", error);
    return [];
  }
};
