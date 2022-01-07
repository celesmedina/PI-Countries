import "./Card.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cleanCountry } from "../actions/Actions";

export default function Card(props) {
  const navigate = useNavigate();
  let dispatch = useDispatch();

  const handleOnClick = (id) => {
    dispatch(cleanCountry());
    let path = "/countries/" + id;
    navigate(path);
  };
  return (
    <div class="card" onClick={() => handleOnClick(props.id)}>
      <img class="card-img" src={props.imagen} alt="" />
      <p> {props.nombre}</p>
      <p> {props.continente}</p>
    </div>
  );
}
