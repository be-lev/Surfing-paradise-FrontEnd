import VacationModel from "../Models/VacationModel";
import "./VacationCard.css";
import { Globals } from "../../../Services/Globals";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import { vacationDeletedAction, vacationFollowedAction } from "../../../Redux/vacationsState";
import store from "../../../Redux/store";
import { useSelector } from "react-redux";
import axios from "axios";
import { NavLink } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import EditIcon from "@material-ui/icons/Edit";

interface VacationsCardProps {
  singleVacation: VacationModel;
}

function VacationCard({ singleVacation }: VacationsCardProps): JSX.Element {
  const { user } = useSelector((state) => state.authState);

  const reformatDate = (sqlDate: any) => {
    const date = new Date(sqlDate);
    return date.toLocaleDateString();
  };

  //dispatch value from follow button in the vacation card and update the server 
  const handleFollowVacation = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const followCheckBoxValue = event.target.checked;
    const action = vacationFollowedAction({
      ...singleVacation,
      isFollowed: followCheckBoxValue,
    });
    store.dispatch(action);

    if (followCheckBoxValue) {
      await axios.post<any>(Globals.vacationsUrl + "followVacation", {
        singleVacation,
        user,
      });
    } else {
      await axios.delete<VacationModel>(
        Globals.vacationsUrl + "followVacation/" + singleVacation.vacationId
      );
    }
  };

  const DeleteVacation = async (event: React.MouseEvent<HTMLElement>) => {
    const answer = window.confirm("Are you sure?");
        if (!answer) return;
        await axios.delete<VacationModel>(Globals.vacationsUrl + singleVacation.vacationId);
        const action = vacationDeletedAction(singleVacation)
        store.dispatch(action);
  };

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      button: {
        margin: theme.spacing(1),
      },
    })
  );
  const classes = useStyles();

  return (
    <div className="VacationCard">
      <span className="follow-button-span">
        <FormControlLabel
          control={
            <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
              name="checkedH"
              defaultChecked={singleVacation.isFollowed}
              onChange={handleFollowVacation}
            />
          }
          label="Follow me"
        />
      </span>
      <span className="follow-count-span">
        Total Followers: {singleVacation.followCount}
      </span>
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
      <span>this is conditional rending for admin use only</span>
      <NavLink to={"/vacations/edit/" + singleVacation.vacationId}>
        {" "}
        <EditIcon />
        Edit
      </NavLink>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<DeleteIcon />}
        onClick={DeleteVacation}
      >
        Delete
      </Button>
    </div>
  );
}

export default VacationCard;
