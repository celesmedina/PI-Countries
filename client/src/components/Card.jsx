import "./Card.css";
import { useNavigate } from "react-router-dom";

export default function Card(props) {
  const navigate = useNavigate();

  const handleOnClick = (id) => {
    let path = "/countries/" + id;
    navigate(path);
  };
  return (
    <div class="card" onClick={() => handleOnClick(props.id)}>
      <div class="country-name">
        <p> {props.nombre}</p>
      </div>
      <div>
        <img class="card-img" src={props.imagen} alt="" />
      </div>
      <div class="country-continent">
        <p> {props.continente}</p>
      </div>
    </div>
  );
}
