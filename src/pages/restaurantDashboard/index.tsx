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
  PositionDiv,
  RestaurantInfo,
  ScoreDiv,
  TypeHour,
} from "./style";
import { FaHeart } from "react-icons/fa";
import { Stack } from "@mui/material";
import Rating from "react-rating";
import { useRestaurants } from "../../providers/restaurants";
import { useEffect, useState } from "react";
import { RestaurantsData, BusinessHoursData } from "../../types";
import { useScore } from "../../providers/score";
import CardFood from "../../components/cardFood";
import emptyStar from "../../assets/img/emptyStar.png";
import fullStar from "../../assets/img/fullStar.png";

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

  const restaurantScore = scores
    .filter((score) => score.restaurantId.toString() === params.id)
    .map((rest) => rest.score);

  const media =
    restaurantScore.reduce((acc, note) => acc + note, 0) /
    restaurantScore.length;

    console.log(media)

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
          <PositionDiv>
            <RestaurantInfo>
              <h1>Descrição</h1>
              <Description>{restaurante.description}</Description>
              <TypeHour>
                <h3>{restaurante.type}</h3>
                <h3>
                  {/* 19:00 às 21:00 */}
                  {restaurante.businessHours && restaurante.businessHours.open}
                  :00h às{" "}
                  {restaurante.businessHours && restaurante.businessHours.close}
                  :00h
                </h3>
              </TypeHour>
              <ScoreDiv>
                <Stack spacing={1}>
                  <Rating
                  fractions={2}
                    placeholderRating={media}
                    emptySymbol={
                      <img src={emptyStar} alt="" className="icon" />
                    }
                    placeholderSymbol={
                      <img src={fullStar} alt="" className="icon" />
                    }
                    fullSymbol={<img src={fullStar} alt="" className="icon" />}
                  />
                </Stack>
                <h3>Dê sua nota</h3>
              </ScoreDiv>
            </RestaurantInfo>
            <Menu>
              {restaurante.menu &&
                restaurante.menu.map((dish, index) => (
                  <CardFood
                    key={index}
                    name={dish.name}
                    price={dish.price}
                    img={dish.img}
                    description={dish.description}
                  />
                ))}
            </Menu>
          </PositionDiv>
          <MenuBottom />
        </Container>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
};

export default RestaurantDashboard;
