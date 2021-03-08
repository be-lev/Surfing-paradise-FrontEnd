import VacationModel from "../Models/VacationModel";
import "./VacationCard.css";
import { Globals } from "../../../Services/Globals";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import { vacationFollowedAction } from "../../../Redux/vacationsState";
import store from "../../../Redux/store";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";

interface VacationsCardProps {
  singleVacation: VacationModel;
}

function VacationCard({ singleVacation }: VacationsCardProps): JSX.Element {
  //subscribe to state
  const { user } = useSelector((state) => state.authState);
  //format date to for UI presenting
  const reformatDate = (sqlDate: any) => {
    const date = new Date(sqlDate);
    return date.toLocaleDateString();
  };

  //get User Follow Status from the server
  const checkIfFollowed = async () => {
    try {
      const response = await axios.get<boolean>(
        Globals.vacationsUrl +
          "isFollowed/" +
          singleVacation.vacationId +
          "/" +
          user.uuid
      );
      //update redux
      const action = vacationFollowedAction({
        ...singleVacation,
        isFollowed: response.data,
      });
      store.dispatch(action);
    } catch (err) {
      console.log(err.message + "something went wrong with the server  ");
    }
  };

  //unsubscribe and fetch data on demand
  useEffect(() => {
    checkIfFollowed();
  }, []);

  //dispatch value from follow button in the vacation card and update the server
  const handleFollowVacation = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    //get value from checkbox
    const followCheckBoxValue = event.target.checked;
    //based on checkbox value preform add follow
    if (followCheckBoxValue) {
      try {
        await axios.post<any>(Globals.vacationsUrl + "followVacation", {
          singleVacation,
          user,
        });
      } catch (err) {
        console.log(
          err.message +
            "something went wrong with following the vacation we are sorry  "
        );
      }
    } else {
      //based on checkbox value preform delete follow from server
      try {
        await axios.delete<any>(
          Globals.vacationsUrl +
            "followVacation/" +
            singleVacation.vacationId +
            "/" +
            user.uuid
        );
      } catch (err) {
        console.log(
          err.message +
            "something went wrong with un-following the vacation we are sorry "
        );
      }
    }
  };

  return (
    <div className="VacationCard">
      <span className="follow-button-span">
        <FormControlLabel
          control={
            <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
              name="checkedH"
              defaultChecked={singleVacation.isFollowed} //change rendering status based on redux state (troughs an error on consol)
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
      Price: {singleVacation.price}$
      <br />
      <img
        src={Globals.vacationsUrl + "images/" + singleVacation.imageName}
        alt="WTF"
      />
    </div>
  );
}

export default VacationCard;
