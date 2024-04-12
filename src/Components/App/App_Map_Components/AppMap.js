import { Container as MapDiv, NaverMap, Marker } from "react-naver-maps";

import React, { useState, useCallback, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import AppSplash from "../App_Splash_Components/AppSplash";
import { theme } from "../../../Style/theme";
import axios from "axios";

const AppMap = () => {
  const NAVER_API_KEY = process.env.REACT_APP_NAVER_MAP_API_KEY;
  const NAVER_ID = process.env.REACT_APP_NAVER_ID;
  const navermaps = window.naver.maps;
  const [naverMap, setNaverMap] = useState();
  const [currentPosition, setCurrentPosition] = useState(null);
  const [markers, setMarkers] = useState([]);

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
  const [isContainersVisible, setIsContainersVisible] = useState(true);

  const toggleContainersVisibility = () => {
    setIsContainersVisible(false);
  };
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
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
  const handleMapClick = () => {
    setSliderVisible(false);
    setIsSliderVisible(false);
  };
  // 현재 위치 받아오기
  const handleCurrentLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newPosition = new navermaps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );
          // const positionData = {
          //   key: 3745,
          //   position: new navermaps.LatLng(37.5432527996, 127.0566145649),
          //   title: "성수동 카페거리",
          // };
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
    if (!searchQuery) {
      alert("검색어를 입력해주세요.");
      return;
    }
    try {
      const response = await axios.get("/v1/search/local.json", {
        params: {
          query: searchQuery,
          display: 5,
        },
        headers: {
          "X-Naver-Client-Id": NAVER_ID,
          "X-Naver-Client-Secret": NAVER_API_KEY,
        },
      });
      const { items } = response.data.response.body.items;
      items.forEach((item) => {
        console.log("Item Title:", item.title);
      });
    } catch (error) {
      console.error("Error fetching data from Naver Search API", error);
      if (error.response) {
        console.error("Status Code:", error.response.status);
        console.error("Response Data:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up the request:", error.message);
      }
      alert("검색 중 오류가 발생했습니다.");
    }
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
          //onInitialized={(map) => setNaverMap(map)}
          onClick={handleMapClick}
        >
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
            >
              <Marker position={currentPosition} />
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
      backgroundColor: "white",
      padding: "20px",
      boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)",
      borderTopLeftRadius: "18px",
      borderTopRightRadius: "18px",
    }}
    onMouseDown={handleSliderDragStart}
    onMouseUp={handleSliderDragEnd}
    onMouseLeave={handleSliderDragEnd}
  >
    {children}
  </div>
);
const SliderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
