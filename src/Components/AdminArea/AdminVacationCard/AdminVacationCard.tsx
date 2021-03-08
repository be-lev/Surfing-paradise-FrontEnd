import VacationModel from "../../VacationsArea/Models/VacationModel";
import "./AdminVacationCard.css";
import { Globals } from "../../../Services/Globals";
import { vacationDeletedAction } from "../../../Redux/vacationsState";
import store from "../../../Redux/store";
import axios from "axios";
import { NavLink } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";

interface VacationsCardProps {
  singleVacation: VacationModel;
}

function AdminVacationCard({ singleVacation }: VacationsCardProps): JSX.Element {

    //format date to for UI presenting
  const reformatDate = (sqlDate: any) => {
    const date = new Date(sqlDate);
    return date.toLocaleDateString();
  };

  //onClick event delete vacation with socket connected to redux
  const DeleteVacation = async (event: React.MouseEvent<HTMLElement>) => {
    const answer = window.confirm("Are you sure?");
        if (!answer) return;
        try{await axios.delete<VacationModel>(Globals.vacationsUrl + singleVacation.vacationId);   
        }catch(err){
            alert("Hi admin something went wrong with deleting this vacation call Lev ASAP!")
        }
        };

//material UI styles
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      button: {
        margin: theme.spacing(1),
      },
    })
  );
  const classes = useStyles();

  return (
    <div className="AdminVacationCard">
 
      Destination: {singleVacation.destination}
      <br />
      Description:
      <p> {singleVacation.description} </p>
      Starting From: <br /> {reformatDate(singleVacation.fromDate)}
      <br />
      Until the: <br />
      {reformatDate(singleVacation.toDate)}
      <br />
      Price: {singleVacation.price}$ <br />
      <img
        src={Globals.vacationsUrl + "images/" + singleVacation.imageName}
        alt="WTF"
      />
      <br />
      <br />
      <br />
      <br />
      <NavLink to={"/vacations/edit/" + singleVacation.vacationId}>
        {" "}
        <EditIcon />
        Edit Vacation
      </NavLink> 
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<DeleteIcon />}
        onClick={DeleteVacation}
      >
        Delete Vacation
      </Button>
    </div>
  );
}

export default AdminVacationCard;
