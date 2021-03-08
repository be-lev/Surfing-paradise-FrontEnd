import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import store from "../../../Redux/store";
import "./AddVacation.css";
import VacationModel from "../../VacationsArea/Models/VacationModel";
import { vacationAddedAction } from "../../../Redux/vacationsState"
import { Globals } from "../../../Services/Globals";

function AddVacation(): JSX.Element {
//use history hook
    const history= useHistory();

//enable use Form with validation
const { register, handleSubmit, errors } = useForm<VacationModel>();


async function submit(vacation: VacationModel) {
    try {
        const myFormData = new FormData(); // Object which can send anything to the server - native data + files
        myFormData.append("destination", vacation.destination);
        myFormData.append("description", vacation.description);
        myFormData.append("fromDate", vacation.fromDate.toString());
        myFormData.append("toDate", vacation.toDate.toString());
        myFormData.append("price", vacation.price.toString());
        myFormData.append("image", vacation.image.item(0));
      
        const response = await axios.post<VacationModel>(
        Globals.vacationsUrl,
        myFormData
      );
      const addedVacation = response.data;
      //update redux
      const action = vacationAddedAction(addedVacation);
      store.dispatch(action);
      alert(
        "Vacation ID: " + addedVacation.vacationId + "has been successfully added"
      );
      history.push("/vacations");
    } catch (err) {
      console.log(err);
      alert( "Error: " + err);
    }
  }

    return (
        <div className="AddVacation">
			     <h2>Add New Vacation</h2>

<form onSubmit={handleSubmit(submit)} encType="multipart/form-data">

    <label>Destination: </label> <br />
    <input type="text" name="destination" ref={register({ required: true, minLength: 5 })} />
    {errors.destination?.type === "required" && <span>Missing Destination .</span>}
    {errors.destination?.type === "minLength" && <span>Description too short.</span>}
    <br /> <br />


    <label>Description: </label> <br />
    <input type="text" name="description" ref={register({ required: true, minLength: 10 })} />
    {errors.description?.type === "required" && <span>Missing Description.</span>}
    {errors.description?.type === "minLength" && <span>Description too short.</span>}
    <br /> <br />

  

    <label>Starting From: </label> <br />
    <input type="date" name="fromDate" ref={register({ required: true})} />
    {errors.fromDate?.type === "required" && <span>Missing starting date.</span>}
   
    <br /> <br />

    <label>Until the: </label> <br />
    <input type="date" name="toDate" ref={register({ required: true})} />
    {errors.toDate?.type === "required" && <span>Missing ending date.</span>}
   
    <br /> <br />


    <label>Price: </label> <br />
    <input type="number" name="price" step="0.01" ref={register({ required: true, min: 0, max: 10000 })} />
    {errors.price?.type === "required" && <span>Missing price.</span>}
    {errors.price?.type === "min" && <span>Price can't be negative.</span>}
    {errors.price?.type === "max" && <span>Price can't exceed 10,000.</span>}
    <br /> <br />


    <label>Image: </label> <br />
    <input type="file" name="image" accept="image/*" ref={register({ required: true })} />
    {errors.imageName && <span>Missing image.</span>}
    <br /> <br />

    <button>Add</button>

</form>
        </div>
    );
}

export default AddVacation;
