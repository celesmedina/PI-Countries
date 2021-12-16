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
      {/* <div class="country-name"> */}
      <img class="card-img" src={props.imagen} alt="" />
      <p> {props.nombre}</p>
      <p> {props.continente}</p>

      {/* </div> */}
      {/* <div> */}
      {/* </div> */}
      {/* <div class="country-continent"> */}
      {/* </div> */}
    </div>
  );
}
