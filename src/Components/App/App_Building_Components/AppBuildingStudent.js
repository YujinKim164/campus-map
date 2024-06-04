import React, { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "../../../Style/theme";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../../../locales/i18n";
import CaretLeft from "../../../Assets/img/CaretLeft.png";

import { db } from "../../../Firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

const AppBuildingStudent = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [foodClicked, setFoodClicked] = useState(false);
  const [cafeClicked, setCafeClicked] = useState(false);
  const handleFoodClick = () => {
    setFoodClicked(true);
    setCafeClicked(false);
  };

  const handleCafeClick = () => {
    setCafeClicked(true);
    setFoodClicked(false);
  };

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // '한동대학교' 컬렉션의 문서들을 가져옴
        const universityCollectionRef = collection(db, "한동대학교");
        const universityDocs = await getDocs(universityCollectionRef);
        
        const universityData = await Promise.all(universityDocs.docs.map(async buildingDoc => {
          const buildingData = { id: buildingDoc.id, ...buildingDoc.data(), floors: [] };

          // 각 건물 문서의 하위 컬렉션인 '1층' 문서들을 가져옴
          const floorsCollectionRef = collection(buildingDoc.ref, "1층");
          const floorDocs = await getDocs(floorsCollectionRef);

          buildingData.floors = floorDocs.docs.map(floorDoc => ({
            id: floorDoc.id,
            ...floorDoc.data()
          }));

          return buildingData;
        }));

        setData(universityData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <TopAppBar>
        <Vector onClick={() => navigate("/building")} />
        <TopAppBarTxt>{t("facilityDetail")}</TopAppBarTxt>
      </TopAppBar>
      <Div>
        <BuildingTxt>{t("student")}</BuildingTxt>
        <CategoryDiv>
          <Category onClick={handleFoodClick} clicked={foodClicked}>
            {t("food")}
          </Category>
          <Category onClick={handleCafeClick} clicked={cafeClicked}>
            {t("cafe")}
          </Category>
        </CategoryDiv>
        <div>
          {data ? (
            data.map(building => (
              <div key={building.id}>
                <h2>{building.name || building.id}</h2>
                {building.floors.map(floor => (
                  <div key={floor.id}>
                    <h3>{floor.name || floor.id}</h3>
                    <p>{floor.정보} {floor.시간}</p>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p>Loading...</p> // 데이터를 로드 중일 때 표시할 내용
          )}
        </div>
      </Div>
      <Link to="/building">{t("facilities")}</Link>
    </ThemeProvider>
  );
};

export default AppBuildingStudent;

const Div = styled.div`
  padding-left: 23px;
  padding-right: 23px;
  padding-top: 36px;
`;

const TopAppBar = styled.div`
  display: flex;
  height: 60px;
  align-items: center;
  background-color: ${(props) => props.theme.colors.Primary_blue};
`;
const Vector = styled.div`
  width: 40px;
  height: 40px;
  margin-left: 11px;
  background-image: url(${CaretLeft});
  background-size: cover;
`;
const TopAppBarTxt = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  color: ${(props) => props.theme.colors.White};
  font-size: 20px;
`;

const BuildingTxt = styled.div`
  font-size: 20px;
  color: ${(props) => props.theme.colors.black_100};
  font-weight: 500;
  margin-bottom: 21px;
`;

const CategoryDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 14px;
  margin-bottom: 36px;
`;

const Category = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 40px;
  border-radius: 20px;
  color: ${(props) =>
    props.clicked ? props.theme.colors.White : props.theme.colors.Primary_blue};
  background-color: ${(props) =>
    props.clicked ? props.theme.colors.Primary_blue : props.theme.colors.White};
  border: 1px solid;
  border-color: ${(props) =>
    props.clicked ? "transparent" : props.theme.colors.Primary_blue};
  font-size: 16px;
  font-weight: 600;
  line-height: 40px;
`;
