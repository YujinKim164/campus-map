import React, { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "../../../Style/theme";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../../../locales/i18n";
import CaretLeft from "../../../Assets/img/CaretLeft.png";

import { db } from "../../../Firebase";
import { collection, getDocs, doc } from "firebase/firestore";

const AppBuildingEBEN = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedFloor, setSelectedFloor] = useState("1층");
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentUnionDocRef = doc(db, "한동대학교", "에벤에셀관");

        const floorsData = [];
        const collections = ["1층", "2층", "3층", "4층"];

        for (const collectionName of collections) {
          const collectionRef = collection(studentUnionDocRef, collectionName);
          const floorDocs = await getDocs(collectionRef);

          floorsData[collectionName] = floorDocs.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
        }

        setData(floorsData);
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
        <BuildingTxt>{t("EBEN")}</BuildingTxt>
        <CategoryDiv>
          {["1층", "2층", "3층", "4층"].map((floor) => (
            <Category
              key={floor}
              onClick={() => setSelectedFloor(floor)}
              clicked={selectedFloor === floor}
            >
              {floor}
            </Category>
          ))}
        </CategoryDiv>
        <CardsContainer>
          {data[selectedFloor] ? (
            data[selectedFloor].map((item) => (
              <Card key={item.id}>
                <CardGrid>
                  <CardHeaderLeft>이름</CardHeaderLeft>
                  <CardHeaderRight>정보</CardHeaderRight>
                  <CardBodyLeft>{item.id}</CardBodyLeft>
                  <CardBodyRight>
                    {Object.keys(item)
                      .filter((key) => key !== "id")
                      .map((key) => (
                        <CardText key={key}>{`${item[key]}`}</CardText>
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

export default AppBuildingEBEN;

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
  white-space: nowrap; // 줄 바꿈 방지
`;

const CardBodyRight = styled.div`
  padding: 16px;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
`;

const CardText = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.colors.black_80};
  text-align: center;
`;
