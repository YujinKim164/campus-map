import React, { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "../../../Style/theme";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../../../locales/i18n";
import CaretLeft from "../../../Assets/img/CaretLeft.png";

import { db } from "../../../Firebase";
import { collection, getDocs, doc } from "firebase/firestore";

const AppBuildingStudent = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("food");
  const [data, setData] = useState({ food: [], rental: [], lecture: [], office: [] });

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentUnionDocRef = doc(db, "한동대학교", "학생회관");

        const collections = ["식당", "대여 장소", "강의실", "오피스"];
        const fetchedData = {};

        for (const collectionName of collections) {
          const collectionRef = collection(studentUnionDocRef, collectionName);
          const floorDocs = await getDocs(collectionRef);
          fetchedData[collectionName] = floorDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        }

        setData({
          food: fetchedData["식당"] || [],
          rental: fetchedData["대여 장소"] || [],
          lecture: fetchedData["강의실"] || [],
          office: fetchedData["오피스"] || []
        });
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
          <Category onClick={() => handleCategoryClick("food")} clicked={selectedCategory === "food"}>
            {t("food")}
          </Category>
          <Category onClick={() => handleCategoryClick("rental")} clicked={selectedCategory === "rental"}>
            {t("rental")}
          </Category>
          <Category onClick={() => handleCategoryClick("lecture")} clicked={selectedCategory === "lecture"}>
            {t("lecture")}
          </Category>
          <Category onClick={() => handleCategoryClick("office")} clicked={selectedCategory === "office"}>
            {t("office")}
          </Category>
        </CategoryDiv>
        <CardsContainer>
          {data[selectedCategory]?.length > 0 ? (
            data[selectedCategory].map((item) => (
              <Card key={item.id}>
                <CardGrid>
                  <CardHeaderLeft>이름</CardHeaderLeft>
                  <CardHeaderRight>정보</CardHeaderRight>
                  <CardBodyLeft>{item.id}</CardBodyLeft>
                  <CardBodyRight>
                    {Object.keys(item)
                      .filter((key) => key !== "id")
                      .sort() // key를 정렬하여 순서를 고정
                      .map((key) => (
                        <CardText key={key}>{`${key}: ${item[key]}`}</CardText>
                      ))}
                  </CardBodyRight>
                </CardGrid>
              </Card>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </CardsContainer>
      </Div>
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
  width: 100px;
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

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Card = styled.div`
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.White};
  box-shadow: 0 0 0 1px ${(props) => props.theme.colors.Primary_blue};
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr;
  gap: 0;
  align-items: stretch;
  justify-items: stretch;
  height: 100%;
`;

const CardHeaderLeft = styled.div`
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  border-bottom: 1px solid ${(props) => props.theme.colors.Primary_blue};
  border-right: 1px solid ${(props) => props.theme.colors.Primary_blue};
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
`;

const CardHeaderRight = styled.div`
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  border-bottom: 1px solid ${(props) => props.theme.colors.Primary_blue};
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
`;

const CardBodyLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border-right: 1px solid ${(props) => props.theme.colors.Primary_blue};
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  white-space: normal; // 줄 바꿈을 위해 변경
`;

const CardBodyRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column; // 내용들이 세로로 쌓이도록 설정
  padding: 16px;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  white-space: normal; // 줄 바꿈을 위해 변경
`;

const CardText = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.colors.black_80};
  text-align: center; // 텍스트를 가운데 정렬로 변경
  white-space: normal; // 줄 바꿈을 위해 변경
  overflow: visible; // 내용을 넘어서지 않도록 설정
`;

