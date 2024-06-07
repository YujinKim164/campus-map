import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "../../../Style/theme";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  getFirestore,
  collection,
  getDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { useTranslation } from "react-i18next";
import i18n from "../../../locales/i18n";
import CaretLeftGray from "../../../Assets/img/CaretLeftGray.png";
import { chips } from "./chips";

const AppMapChipDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [chipType, setChipType] = useState("");
  const [facilities, setFacilities] = useState([]);

  const chipNames = {
    food: "식당",
    cafe: "카페",
    cvs: "편의점",
  };

  useEffect(() => {
    if (location.state && location.state.chipType) {
      setChipType(location.state.chipType);
      fetchFacilities(location.state.chipType);
    }
  }, [location.state]);

  const fetchFacilities = async (clickedChipType) => {
    const db = getFirestore();

    if (!chips[clickedChipType]) {
      console.error(`Invalid chip type: ${clickedChipType}`);
      return;
    }

    const facilitiesData = [];

    try {
      for (const path of chips[clickedChipType]) {
        const { building, floor, target } = path;

        if (target) {
          const docRef = doc(db, `한동대학교/${building}/${floor}/${target}`);
          const docSnapshot = await getDoc(docRef);

          if (docSnapshot.exists()) {
            facilitiesData.push({
              building,
              floor,
              facility: target,
              data: docSnapshot.data(),
            });
          } else {
            facilitiesData.push({
              building,
              floor,
              facility: target,
              data: null,
            });
          }
        } else {
          const collectionRef = collection(
            db,
            `한동대학교/${building}/${floor}`
          );
          const snapshot = await getDocs(collectionRef);

          snapshot.forEach((doc) => {
            facilitiesData.push({
              building,
              floor,
              facility: doc.id,
              data: doc.data(),
            });
          });
        }
      }
    } catch (error) {
      console.error("Error fetching data from Firebase", error);
    }

    setFacilities(facilitiesData);
  };

  const handleChipClick = (clickedChipType) => {
    console.log(`handleChipClick called with type: ${clickedChipType}`);
    setChipType(clickedChipType);
    navigate("/chip", { state: { chipType: clickedChipType } });
    fetchFacilities(clickedChipType);
  };

  return (
    <ThemeProvider theme={theme}>
      <TopAppBar>
        <Vector onClick={() => navigate("/")} />
        <ChipTxt>{chipNames[chipType]}</ChipTxt>
      </TopAppBar>
      {facilities.map((facility, index) => (
        <MenuDiv key={index}>
          {facility.facility}
          <Detail>
            {Object.values(facility.data).map((value, i) => (
              <div key={i}>{value}</div>
            ))}
          </Detail>
        </MenuDiv>
      ))}
      <Link to="/">홈페이지</Link>
    </ThemeProvider>
  );
};

export default AppMapChipDetail;

const TopAppBar = styled.div`
  display: flex;
  height: 60px;
  align-items: center;
  background-color: ${(props) => props.theme.colors.White};
  border-bottom: 3px solid #dadada;
`;

const ChipTxt = styled.div`
  font-size: 18px;
  color: ${(props) => props.theme.colors.black_90};
  justify-content: center;
`;

const MenuDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 25px;
  padding-bottom: 25px;
  padding-left: 15px;
  font-size: 18px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.black_90};
  border-bottom: 1px solid #dadada;
`;
const Detail = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.gray_80};
`;
const Vector = styled.div`
  width: 40px;
  height: 40px;
  margin-left: 11px;
  background-image: url(${CaretLeftGray});
  background-size: cover;
`;
