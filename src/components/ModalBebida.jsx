import { Modal, Image } from "react-bootstrap";
import { useBebidas } from "../hooks/useBebidas";

export const ModalBebida = () => {
  const { cargando, handleModalClick, modal, mostrarIngredientes, receta } =
    useBebidas();

  return (
    !cargando && (
      <Modal show={modal} onHide={handleModalClick}>
        {cargando && "Cargando"}
        <Image
          src={receta.strDrinkThumb}
          alt={`Imagen de ${receta.strDrink}`}
        />
        <Modal.Header>
          <Modal.Title>{receta.strDrink}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="p-3">
            <h2>Instrucciones</h2>
            <p>{receta.strInstructions}</p>
            <h2>Ingredientes y Cantidades</h2>
            <p>{mostrarIngredientes()}</p>
          </div>
        </Modal.Body>
      </Modal>
    )
  );
};
