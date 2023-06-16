/* eslint-disable react/prop-types */
import { Col, Card, Button } from "react-bootstrap";
import { useBebidas } from "../hooks/useBebidas";

export const Bebida = ({ bebida }) => {
  const { handleBebidaIdClick, handleModalClick } = useBebidas();
  return (
    <Col md={6} lg={3}>
      <Card className="mb-4">
        {/* El Variant Top se requiere en este elemento para que funcione bien */}
        <Card.Img
          variant={"top"}
          src={bebida.strDrinkThumb}
          alt={bebida.strDrink}
        />
        <Card.Body>
          <Card.Title>{bebida.strDrink}</Card.Title>
          <Button
            className="w-100 text-uppercase mt-2 "
            variant={"warning"}
            onClick={() => {
              handleModalClick();
              handleBebidaIdClick(bebida.idDrink);
            }}
          >
            Ver Receta
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};
