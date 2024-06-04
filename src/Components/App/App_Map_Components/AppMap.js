import {
  Container as MapDiv,
  NaverMap,
  Marker,
  Polygon,
} from "react-naver-maps";
import { useNavigate } from "react-router-dom";
import { fetchOpenPlaces } from "./../../../firebaseService";
import { db } from "./../../../Firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import React, { useState, useCallback, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import AppSplash from "../App_Splash_Components/AppSplash";
import { theme } from "../../../Style/theme";
import axios from "axios";
import FindRoute from "../../../Assets/img/FindRoute.png";
import NavigationDrawer from "../../../Assets/img/NavigationDrawer.png";
import { useTranslation } from "react-i18next";
import i18n from "./../../../locales/i18n";
import Modal from "react-modal";
import placesData from "./../../../places.json";

const AppMap = () => {
  const fill = "#ff0000";
  const opacity = 0.3;
  const NAVER_API_KEY = process.env.REACT_APP_NAVER_MAP_API_KEY;
  const NAVER_ID = process.env.REACT_APP_NAVER_ID;
  const navermaps = window.naver.maps;
  const [naverMap, setNaverMap] = useState();
  const [currentPosition, setCurrentPosition] = useState(null);
  const [openPlaces, setOpenPlaces] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [filteredMarkers, setFilteredMarkers] = useState([]);

  const handleZoomChanged = useCallback((zoom) => {
    console.log(`zoom: ${zoom}`);
  }, []);
  const [sliderVisible, setSliderVisible] = useState(false);
  const [isSliderVisible, setIsSliderVisible] = useState(false);
  const [sliderPosition, setSliderPosition] = useState("bottom");
  const [selectedMarkerInfo, setSelectedMarkerInfo] = useState(null);
  const [newPosition, setNewPosition] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sliderHeight, setSliderHeight] = useState("167px");
  const [isContainersVisible, setIsContainersVisible] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { t } = useTranslation();
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  const toggleContainersVisibility = () => {
    setIsContainersVisible(false);
  };
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleMapInit = (map) => {
    setNaverMap(map);
  };
  const handleSliderUpClick = async () => {
    toggleSliderHeight();
    toggleContainersVisibility();
  };
  useEffect(() => {
    setIsContainersVisible(true);
    return () => {
      setIsContainersVisible(false);
    };
  }, [sliderHeight]);

  const toggleSliderHeight = () => {
    setSliderHeight((prevHeight) =>
      prevHeight === "167px" ? "568px" : "167px"
    );

    setIsContainersVisible((prevVisible) => !prevVisible);
  };
  const handleSliderClose = () => {
    setSliderVisible(false);
    setIsSliderVisible(false);
  };
  const handleSliderDragStart = () => {
    setSliderPosition("visible");
  };

  const handleSliderDragEnd = () => {
    setSliderPosition("bottom");
  };

  const handleMapClick = (e) => {
    setSliderVisible(false);
    setIsSliderVisible(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    const loadOpenPlaces = async () => {
      const places = await fetchOpenPlaces();
      setOpenPlaces(places);
      setLoading(false);
    };

    loadOpenPlaces();
  }, []);
  // 현재 위치 받아오기
  const handleCurrentLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newPosition = new navermaps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );
          setCurrentPosition(newPosition);
          setNewPosition(newPosition);
          console.log("My current location: ", newPosition);
        },
        (error) => {
          console.error("Error getting current position:", error);
          window.alert("현재 위치를 찾을 수 없습니다.");
        }
      );
    } else {
      window.alert("브라우저가 위치 정보를 지원하지 않습니다.");
    }
  }, [navermaps, setCurrentPosition]);

  const handleToCurrentPosition = () => {
    console.log("Trying to pan to current position", newPosition);

    if (naverMap) {
      naverMap.panTo(newPosition);
    } else {
      console.log("NaverMap is not initialized yet.");
    }
  };

  useEffect(() => {
    // 페이지 로딩 시에 현재 위치 받아오기
    handleCurrentLocation();
  }, [handleCurrentLocation, navermaps]);

  // 로딩 화면
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const handleSearch = async () => {
    console.log("handleSearch called with query:", searchQuery);
    if (!searchQuery) {
      alert("검색어를 입력해주세요.");
      return;
    }

    try {
      const db = getFirestore();

      // "buildings" 컬렉션의 문서 가져오기
      const buildingsCollection = collection(db, "buildings");
      const buildingsSnapshot = await getDocs(buildingsCollection);

      let filteredData = null;

      for (const buildingDoc of buildingsSnapshot.docs) {
        const buildingId = buildingDoc.id;
        console.log(`Processing buildingId: ${buildingId}`);

        const placesCollection = collection(
          db,
          `buildings/${buildingId}/places`
        );
        const placesSnapshot = await getDocs(placesCollection);

        for (const placeDoc of placesSnapshot.docs) {
          const placeId = placeDoc.id;
          console.log(`Processing placeId: ${placeId}`);

          if (placeId === "복지동") {
            const restaurantsCollection = collection(
              db,
              `buildings/${buildingId}/places/${placeId}/식당`
            );
            const restaurantsSnapshot = await getDocs(restaurantsCollection);

            for (const restaurantDoc of restaurantsSnapshot.docs) {
              const restaurantId = restaurantDoc.id;
              console.log(`Processing restaurantId: ${restaurantId}`);

              if (
                restaurantId.toLowerCase().includes(searchQuery.toLowerCase())
              ) {
                const restaurantData = restaurantDoc.data();
                console.log(restaurantData);
                if (restaurantData.정보) {
                  filteredData = {
                    id: restaurantDoc.id,
                    buildingId: buildingId,
                    placeId: placeId,
                    ...restaurantData,
                  };
                }
                break; // 검색어에 해당하는 데이터를 찾으면 반복문 종료
              }
            }

            if (filteredData) break; // 검색어에 해당하는 데이터를 찾으면 반복문 종료
          }
        }

        if (filteredData) break; // 검색어에 해당하는 데이터를 찾으면 반복문 종료
      }

      if (filteredData) {
        console.log("Search Result:", filteredData);
        // 추가로 검색 결과에 따라 필요한 작업을 수행할 수 있습니다.
      } else {
        console.log("No matching results found");
      }

      // 상태에 저장하여 지도에 표시 (이 부분은 필요에 따라 수정)
      if (filteredData) {
        setFilteredPlaces([filteredData]);
        const markers = (
          <Marker
            key={filteredData.id}
            position={
              new navermaps.LatLng(
                filteredData.latitude,
                filteredData.longitude
              )
            }
            onClick={() => console.log(filteredData)}
          />
        );
        setFilteredMarkers([markers]);
      } else {
        setFilteredPlaces([]);
        setFilteredMarkers([]);
      }
    } catch (error) {
      console.error("Error fetching data from Firebase", error);
      alert("검색 중 오류가 발생했습니다.");
    }
  };

  // 두 좌표 간의 거리 계산 함수
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // 지구 반지름 (km)
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  }

  function toRad(value) {
    return (value * Math.PI) / 180;
  }

  // 두 좌표 간의 거리 계산 함수
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // 지구 반지름 (km)
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  }

  function toRad(value) {
    return (value * Math.PI) / 180;
  }

  return (
    <ThemeProvider theme={theme}>
      {loading ? (
        <AppSplash />
      ) : (
        <MapDiv
          style={{
            position: "relative",
            width: "100%",
            height: "100vh",
            display: "flex",
            backgroundColor: "#fff",
            alignItems: "center",
          }}
          onClick={handleMapClick}
        >
          <BackgroundBlur $isOpen={isNavOpen} onClick={toggleNav} />
          <SearchContainer $isVisible={isContainersVisible}>
            <InputGroup>
              <SearchInput
                type="text"
                placeholder={t("mapSearch")}
                value={searchQuery}
                onChange={handleSearchChange}
                disabled={isNavOpen}
              />
              <FindRouteButton onClick={handleSearch} />
              <MenuButton onClick={toggleNav} />
            </InputGroup>
            {isNavOpen && <Navigation />}
          </SearchContainer>
          <ChipContainer $visible={isContainersVisible}>
            <ChipWrapper>
              <Chip>🍴{t("food")}</Chip>
              <Chip>☕{t("cafe")}</Chip>
              <Chip>🍱{t("cvs")}</Chip>
              <Chip>⚽{t("sports")}</Chip>
            </ChipWrapper>
            {isNavOpen && <Navigation />}
          </ChipContainer>
          {currentPosition && (
            <NaverMap
              draggable
              zoomControl={false}
              zoomControlOptions={{
                position: navermaps.Position.TOP_RIGHT,
              }}
              defaultCenter={currentPosition}
              defaultZoom={17}
              onZoomChanged={handleZoomChanged}
              onClick={handleMapClick}
              ref={setNaverMap}
            >
              <Marker position={currentPosition} />
              {/* 운영 중인 장소들 지도에 표시 */}
              {/* {openPlaces.map((place) => (
                <Marker
                  key={place.id}
                  position={
                    new navermaps.LatLng(place.latitude, place.longitude)
                  }
                  onClick={() => console.log(place)}
                />
              ))} */}
              {/* 검색된 장소들 지도에 표시 */}
              {filteredMarkers}
              <Polygon
                id="HDH"
                fillColor={fill}
                strokeWeight={0}
                fillOpacity={opacity}
                clickable={true}
                paths={[
                  new navermaps.LatLng(36.103473, 129.388947),
                  new navermaps.LatLng(36.104024, 129.389165),
                  new navermaps.LatLng(36.10418, 129.388815),
                  new navermaps.LatLng(36.10429, 129.388476),
                  new navermaps.LatLng(36.10431, 129.388113),
                  new navermaps.LatLng(36.104121, 129.388035),
                  new navermaps.LatLng(36.103916, 129.388844),
                  new navermaps.LatLng(36.103542, 129.388708),
                ]}
              />

              <Polygon
                id="NMH"
                fillColor={fill}
                strokeWeight={0}
                fillOpacity={opacity}
                clickable={true}
                paths={[
                  new navermaps.LatLng(36.104242, 129.387804),
                  new navermaps.LatLng(36.104245, 129.38754),
                  new navermaps.LatLng(36.103859, 129.387395),
                  new navermaps.LatLng(36.104072, 129.386555),
                  new navermaps.LatLng(36.10388, 129.386484),
                  new navermaps.LatLng(36.103605, 129.387548),
                ]}
              />

              <Polygon
                id="PB"
                fillColor={fill}
                strokeWeight={0}
                fillOpacity={opacity}
                clickable={true}
                paths={[
                  new navermaps.LatLng(36.1028, 129.3889),
                  new navermaps.LatLng(36.1039, 129.3894),
                  new navermaps.LatLng(36.104, 129.3897),
                  new navermaps.LatLng(36.1039, 129.3901),
                  new navermaps.LatLng(36.1037, 129.3902),
                  new navermaps.LatLng(36.1026, 129.3899),
                ]}
              />

              <Polygon
                id="NTH"
                fillColor={fill}
                strokeWeight={0}
                fillOpacity={opacity}
                clickable={true}
                paths={[
                  new navermaps.LatLng(36.1031, 129.3873),
                  new navermaps.LatLng(36.1033, 129.3865),
                  new navermaps.LatLng(36.1036, 129.3862),
                  new navermaps.LatLng(36.1033, 129.3874),
                ]}
              />
              <Polygon
                id="ANH"
                fillColor={fill}
                strokeWeight={0}
                fillOpacity={opacity}
                clickable={true}
                paths={[
                  new navermaps.LatLng(36.1033, 129.3865),
                  new navermaps.LatLng(36.1036, 129.3862),
                  new navermaps.LatLng(36.1027, 129.3858),
                  new navermaps.LatLng(36.1026, 129.3862),
                ]}
              />

              <Polygon
                id="TC"
                fillColor={fill}
                strokeWeight={0}
                fillOpacity={opacity}
                clickable={true}
                paths={[
                  new navermaps.LatLng(36.10345, 129.3889),
                  new navermaps.LatLng(36.10355, 129.38865),
                  new navermaps.LatLng(36.1039, 129.3887),
                  new navermaps.LatLng(36.1041, 129.3879),
                  new navermaps.LatLng(36.1036, 129.3877),
                  new navermaps.LatLng(36.1033, 129.3889),
                ]}
              />

              <Polygon
                id="RG"
                fillColor={fill}
                strokeWeight={0}
                fillOpacity={opacity}
                clickable={true}
                paths={[
                  new navermaps.LatLng(36.1032, 129.3888),
                  new navermaps.LatLng(36.1026, 129.3886),
                  new navermaps.LatLng(36.1025, 129.3882),
                  new navermaps.LatLng(36.1028, 129.3873),
                  new navermaps.LatLng(36.1035, 129.3876),
                ]}
              />

              <Polygon
                id="SU"
                fillColor={fill}
                strokeWeight={0}
                fillOpacity={opacity}
                clickable={true}
                paths={[
                  new navermaps.LatLng(36.1024, 129.3898),
                  new navermaps.LatLng(36.1018, 129.3896),
                  new navermaps.LatLng(36.1021, 129.3886),
                  new navermaps.LatLng(36.1027, 129.3888),
                  new navermaps.LatLng(36.1026, 129.3894),
                ]}
              />

              <Polygon
                id="OH"
                fillColor={fill}
                strokeWeight={0}
                fillOpacity={opacity}
                clickable={true}
                paths={[
                  new navermaps.LatLng(36.1023391540599, 129.3869946646486),
                  new navermaps.LatLng(36.102404798781954, 129.38675239991272),
                  new navermaps.LatLng(36.10270670498624, 129.38686145831636),
                  new navermaps.LatLng(36.10273795945913, 129.38676248271895),
                  new navermaps.LatLng(36.103008184556984, 129.38687890965696),
                  new navermaps.LatLng(36.102990381196854, 129.38698106827565),
                  new navermaps.LatLng(36.103101995473764, 129.38703163194313),
                  new navermaps.LatLng(36.103061056753596, 129.38727742203233),
                ]}
              />

              <Polygon
                id="CSH"
                fillColor={fill}
                strokeWeight={0}
                fillOpacity={opacity}
                clickable={true}
                paths={[
                  new navermaps.LatLng(36.10246553840461, 129.38664321458643),
                  new navermaps.LatLng(36.102546678926196, 129.38630149675132),
                  new navermaps.LatLng(36.102808066041966, 129.38640932755825),
                  new navermaps.LatLng(36.10273164849371, 129.38674008693826),
                  new navermaps.LatLng(36.10264649423963, 129.38671808066618),
                  new navermaps.LatLng(36.1026272139705, 129.38678133584253),
                  new navermaps.LatLng(36.10247524586832, 129.38672122484925),
                  new navermaps.LatLng(36.10247432161328, 129.38665458274428),
                ]}
              />

              <Polygon
                id="HDF"
                fillColor={fill}
                strokeWeight={0}
                fillOpacity={opacity}
                clickable={true}
                paths={[
                  new navermaps.LatLng(36.102205573070584, 129.38736810034771),
                  new navermaps.LatLng(36.10256050920734, 129.38752872680917),
                  new navermaps.LatLng(36.10235583694989, 129.38819144636312),
                  new navermaps.LatLng(36.10211426883966, 129.38810641511847),
                  new navermaps.LatLng(36.10221760896996, 129.38766822726055),
                  new navermaps.LatLng(36.10215315712044, 129.38762464231218),
                ]}
              />
            </NaverMap>
          )}
          {sliderVisible && selectedMarkerInfo && (
            <Slider
              sliderPosition={sliderPosition}
              sliderHeight={sliderHeight}
              handleSliderDragStart={handleSliderDragStart}
              handleSliderDragEnd={handleSliderDragEnd}
              handleSliderUpClick={toggleSliderHeight}
            >
              <SliderContent>
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexWrap: "wrap",
                    }}
                  ></div>
                </div>
              </SliderContent>
            </Slider>
          )}
        </MapDiv>
      )}
    </ThemeProvider>
  );
};
export default AppMap;

const Slider = ({
  sliderPosition,
  sliderHeight,
  handleSliderDragStart,
  handleSliderDragEnd,
  handleSliderUpClick,
  children,
}) => (
  <div
    style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      height: sliderHeight,
      backgroundColor: "#fff",
      borderTopLeftRadius: "12px",
      borderTopRightRadius: "12px",
      boxShadow: "0px -1px 3px rgba(0,0,0,0.2)",
      display: "flex",
      flexDirection: "column",
      zIndex: 1000,
    }}
    onMouseDown={handleSliderDragStart}
    onMouseUp={handleSliderDragEnd}
  >
    <div
      style={{
        height: "36px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      }}
      onClick={handleSliderUpClick}
    >
      <div
        style={{
          width: "36px",
          height: "4px",
          backgroundColor: "#ccc",
          borderRadius: "2px",
        }}
      />
    </div>
    <div
      style={{
        flex: 1,
        overflowY: "auto",
        padding: "16px",
      }}
    >
      {children}
    </div>
  </div>
);

const SliderContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const SearchContainer = styled.div`
  display: ${(props) => (props.$isVisible ? "flex" : "none")};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  justify-content: center;
  padding: 40px 13px 12px 13px;
  z-index: 1000;
`;

const InputGroup = styled.div`
  position: relative;
  width: 100%;
  max-width: 768px;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  flex-grow: 1;
  border-color: ${(props) => props.theme.colors.Primary_blue};
  border-width: 2px;
  border-radius: 8px;
  padding: 16px 67px 15px 47px;
  font-size: ${(props) => props.theme.fontSizes.Body5};

  &::placeholder {
    font-size: ${(props) => props.theme.fontSizes.Body5};
    font-weight: 500;
    line-height: ${(props) => props.theme.LineHeight.Body5};
    color: ${(props) => props.theme.colors.gray_100};
  }
  &:focus {
    background-image: none;
    background-position: -10px center;
    text-indent: 0;
  }
`;
const FindRouteButton = styled.button`
  width: 48px;
  height: 48px;
  background: none;
  background-image: url(${FindRoute});
  background-size: cover;
  border: none;
  padding: 0;
  margin-left: 5px;
`;
const MenuButton = styled.button`
  position: absolute;
  width: 25px;
  height: 25px;
  top: 14px;
  left: 13px;
  border: none;
  background-image: url(${NavigationDrawer});
  background-size: cover;
`;
const ChipContainer = styled.div`
  display: ${(props) => (props.$visible ? "flex" : "none")};
  position: absolute;
  top: 102px;
  margin-left: 13px;
  overflow-x: auto;
  overflow-y: hidden;
  z-index: 1000;
`;
const ChipWrapper = styled.div`
  display: flex;
  white-space: nowrap;
  margin-bottom: 5px;
  gap: 8px; // 10px -> 8px
`;
const Chip = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  border-radius: 20px;
  padding: 0px 11px 0px 11px;
  font-size: 16px;
  font-weight: 500;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px 0px;
  font-family: "Inter", sans-serif;
  color: ${(props) => props.theme.colors.black_90};
  background-color: ${(props) => props.theme.colors.White};
`;
// Navigation Drawer 구현
const Navigation = () => {
  const handleNavClick = (e) => {
    e.stopPropagation();
  };
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <NavigationDrawerWrapper onClick={handleNavClick}>
      <NavigationDrawerContent>📍 {t("map")}</NavigationDrawerContent>
      <NavigationDrawerContent onClick={() => navigate("/")}>
        🧭 {t("directions")}
      </NavigationDrawerContent>
      <NavigationDrawerContent onClick={() => navigate("/building")}>
        🏢 {t("Facilities")}
      </NavigationDrawerContent>
      <NavigationDrawerContent onClick={() => navigate("/setting")}>
        ⚙️ {t("settings")}
      </NavigationDrawerContent>
    </NavigationDrawerWrapper>
  );
};
const NavigationDrawerWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 264px;
  background-color: #ffffff;
  z-index: 999;
  overflow-y: auto;
  padding-top: 60px;
  transition: left 0.3s ease;
`;

const NavigationDrawerContent = styled.div`
  padding: 30px;
  font-size: 16px;
  font-weight: 500;
`;

const BackgroundBlur = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 10;
  display: ${(props) => (props.$isOpen ? "block" : "none")};
`;

const isOpenNow = (operatingHours) => {
  const [openTime, closeTime] = operatingHours.split(" - ");

  const parseTime = (time) => {
    const [hours, minutes, period] = time
      .match(/(\d+):(\d+)\s*(AM|PM)/)
      .slice(1);
    let hour = parseInt(hours);
    if (period === "PM" && hour !== 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;
    return { hours: hour, minutes: parseInt(minutes) };
  };

  const open = parseTime(openTime);
  const close = parseTime(closeTime);

  const now = new Date();
  const nowHours = now.getHours();
  const nowMinutes = now.getMinutes();

  const isAfterOpen =
    nowHours > open.hours ||
    (nowHours === open.hours && nowMinutes >= open.minutes);
  const isBeforeClose =
    nowHours < close.hours ||
    (nowHours === close.hours && nowMinutes <= close.minutes);

  return isAfterOpen && isBeforeClose;
};
