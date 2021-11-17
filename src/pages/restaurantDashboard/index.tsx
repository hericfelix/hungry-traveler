import NavBar from "../../components/navBar";
import { useLogin } from "../../providers/login";
import { Redirect, useParams } from "react-router";
import MenuBottom from "../../components/menuBottom";
import {
  Container,
  Description,
  HeaderDiv,
  Image,
  Menu,
  RestaurantInfo,
  ScoreDiv,
  TypeHour,
} from "./style";
import { FaHeart } from "react-icons/fa";
import { Rating, Stack } from "@mui/material";
import { useRestaurants } from "../../providers/restaurants";
import { useEffect, useState } from "react";
import { RestaurantsData, BusinessHoursData } from "../../types";
import { useScore } from "../../providers/score";

const RestaurantDashboard = () => {
  const { token } = useLogin();
  const { restaurants } = useRestaurants();
  const { scores } = useScore();
  const params = useParams() as any;
  const [restaurante, setRestaurante] = useState<RestaurantsData>(
    {} as RestaurantsData
  );

  useEffect(
    () =>
      setRestaurante(
        restaurants.find(
          (restaurant) => restaurant.id.toString() === params.id
        ) || ({} as RestaurantsData)
      ),
    [restaurants]
  );

  const score =
    scores.map((item) => item.score).reduce((acc, note) => acc + note, 0) /
    scores.length;

  return (
    <>
      {token ? (
        <Container>
          <NavBar />
          <Image
            style={{
              backgroundImage: `url(${restaurante.img})`,
              backgroundSize: "100% 100%",
            }}
          >
            <HeaderDiv>
              <h2>Restaurante</h2>
              <FaHeart />
            </HeaderDiv>
            <h1>{restaurante.name}</h1>
          </Image>
          <RestaurantInfo>
            <h1>Descrição</h1>
            <Description>{restaurante.description}</Description>
            <TypeHour>
              <h3>{restaurante.type}</h3>
              <h3>
                {/* {restaurante.businessHours.open}:00h às{" "}
                {restaurante.businessHours.close}:00h */}
              </h3>
            </TypeHour>
            <ScoreDiv>
              <Stack spacing={1}>
                <Rating
                  name="simple-controlled"
                  value={score}
                  precision={0.5}
                  readOnly
                />
              </Stack>
              <h3>Dê sua nota</h3>
            </ScoreDiv>
          </RestaurantInfo>
          <Menu>
            {/* {restaurante.menu.map((dish) => (
              <CardFood />
            ))} */}
          </Menu>
          <MenuBottom />
        </Container>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
};

export default RestaurantDashboard;