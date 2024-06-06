import {
  Container as MapDiv,
  NaverMap,
  Marker,
  Polygon,
} from "react-naver-maps";
import { useNavigate } from "react-router-dom";
import { fetchOpenPlaces } from "./../../../firebaseService";
import { db } from "./../../../Firebase";
import { getFirestore, collection, getDoc, doc, getDocs } from "firebase/firestore";
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
import BottomSheet from './BottomSheet';

const AppMap = () => {
  const fill = "#dbffe8";
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

  const [isBottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [bottomSheetContent, setBottomSheetContent] = useState('');
  const [bottomSheetTitle, setBottomSheetTitle] = useState('');
  const [bottomSheetDetail, setBottomSheetDetail] = useState('');
  const [map, setMap] = useState(null);

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

  const buildingMap = {
    "오석관": "OH",
    "현동홀": "HDH",
    "느헤미야홀": "NMH",
    "뉴턴홀": "NTH",
    "올네이션스홀": "ANH",
    "학생회관": "SU",
    "코너스톤홀": "CSH",
    "복지동": "happiness",
    "에벤에셀관": "EBEN",
    "그레이스스쿨": "KGH",
    "언어교육원": "GLC",
    "효암채플": "HCA"
  };
  
  const handleSearch = async () => {
    console.log("handleSearch called with query:", searchQuery);
    if (!searchQuery) {
      alert("검색어를 입력해주세요.");
      return;
    }
  
    try {
      const db = getFirestore();
  
      let filteredData = null;
      let found = false;
  
      for (const buildingName in buildingMap) {
        if (buildingName.toLowerCase().includes(searchQuery.toLowerCase())) {
          console.log(`Processing building: ${buildingName}`);
  
          const buildingId = buildingName;
          const buildingDocRef = doc(db, `한동대학교/${buildingId}`);
          const buildingDoc = await getDoc(buildingDocRef);
  
          if (buildingDoc.exists()) {
            const buildingData = buildingDoc.data();
            const floorKeys = Object.keys(buildingData);
  
            for (const floorKey of floorKeys) {
              console.log(`Processing floor: ${floorKey}`);
  
              const facilitiesCollection = collection(db, `한동대학교/${buildingId}/${floorKey}`);
              const facilitiesSnapshot = await getDocs(facilitiesCollection);
  
              for (const facilityDoc of facilitiesSnapshot.docs) {
                const facilityData = facilityDoc.data();
                const facilityName = facilityDoc.id;
  
                if (facilityName.toLowerCase().includes(searchQuery.toLowerCase())) {
                  console.log(`Found facility: ${facilityName}`, facilityData);
  
                  const polygonId = buildingMap[buildingId];
                  if (polygonId) {
                    handlePolygonClick(polygonId);
                    found = true;
                    break;
                  }
                }
              }
  
              if (found) break; // 층 내부에서 검색어에 해당하는 데이터를 찾으면 반복문 종료
            }
          }
  
          if (found) break; // 건물에서 검색어에 해당하는 데이터를 찾으면 반복문 종료
        }
      }
  
      if (!found) {
        console.log("No matching results found");
        alert("검색 결과가 없습니다.");
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

  const handlePolygonClick = (title,content, detail) => {
    setBottomSheetTitle(title);
    setBottomSheetContent(content);
    setBottomSheetDetail(detail);
    setBottomSheetOpen(true);
  };

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
                onClick={() => handlePolygonClick('HDH','Polygon HDH Information')}
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
                  new navermaps.LatLng(36.10447828523909, 129.38669025012575),
                  new navermaps.LatLng(36.104072, 129.386555),
                  new navermaps.LatLng(36.10388, 129.386484),
                  new navermaps.LatLng(36.103605, 129.387548),
                ]}
                onClick={() => handlePolygonClick('NMH','Polygon NMH Information')}
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
                onClick={() => handlePolygonClick('NTH','Polygon NTH Information')}
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
                onClick={() => handlePolygonClick('ANH','Polygon ANH Information')}
              />

              <Polygon
                id="student"
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
                onClick={() => handlePolygonClick('SU','Polygon SU Information','student')}
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
                onClick={() => handlePolygonClick('OH','Polygon OH Information')}
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
                onClick={() => handlePolygonClick('CSH','Polygon CSH Information')}
              />

              <Polygon
                id="happiness"
                fillColor={fill}
                strokeWeight={0}
                fillOpacity={opacity}
                clickable={true}
                paths={[
                  new navermaps.LatLng(36.10200753789937,129.38984346627404),
                  new navermaps.LatLng(36.10240337729534,129.38998591383793),
                  new navermaps.LatLng(36.10223367616448,129.39058862270784),
                  new navermaps.LatLng(36.10185946243513,129.39049123700366)
                ]}
                onClick={() => handlePolygonClick('happiness','Polygon happiness Information','happiness')}
              />

              <Polygon
                id="EBEN"
                fillColor={fill}
                strokeWeight={0}
                fillOpacity={opacity}
                clickable={true}
                paths={[
                  new navermaps.LatLng(36.103470362021156,129.39114792753975),
                  new navermaps.LatLng(36.10321746943663,129.39208119215698),
                  new navermaps.LatLng(36.10300581281624,129.39207754774174),
                  new navermaps.LatLng(36.1032869921518,129.39108130411196)
                ]}
                onClick={() => handlePolygonClick('EBEN','Polygon EBEN Information','EBEN')}
              />

              <Polygon
                id="KGH"
                fillColor={fill}
                strokeWeight={0}
                fillOpacity={opacity}
                clickable={true}
                paths={[
                  new navermaps.LatLng(36.10287200863515,129.3824060653951),
                  new navermaps.LatLng(36.10232044408132,129.38284459941008),
                  new navermaps.LatLng(36.10180858863123,129.3820797309546),
                  new navermaps.LatLng(36.102334306562014,129.38146832720898)
                ]}
                onClick={() => handlePolygonClick('KGH','Polygon KGH Information','KGH')}
              />

              <Polygon
                id="GLC"
                fillColor={fill}
                strokeWeight={0}
                fillOpacity={opacity}
                clickable={true}
                paths={[
                  new navermaps.LatLng(36.10484037498513,129.38931589155865),
                  new navermaps.LatLng(36.10470996007895,129.38975604667016),
                  new navermaps.LatLng(36.10454020658121,129.38968428655275),
                  new navermaps.LatLng(36.104647778306834,129.38926009412958)
                ]}
                onClick={() => handlePolygonClick('GLC','Polygon GLC Information','GLC')}
              />

              <Polygon
                id="HCA"
                fillColor={fill}
                strokeWeight={0}
                fillOpacity={opacity}
                clickable={true}
                paths={[
                  new navermaps.LatLng(36.10471025480041,129.38996700619964),
                  new navermaps.LatLng(36.10447698553392,129.39082039023216),
                  new navermaps.LatLng(36.10427549612388,129.39075876855028),
                  new navermaps.LatLng(36.10450887560636,129.38989983849623)
                ]}
                onClick={() => handlePolygonClick('HCA','Polygon HCA Information','HCA')}
              />

            </NaverMap>
          )}
          <BottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setBottomSheetOpen(false)}
        title={bottomSheetTitle}
        content={bottomSheetContent}
        detail={bottomSheetDetail}
      />
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
