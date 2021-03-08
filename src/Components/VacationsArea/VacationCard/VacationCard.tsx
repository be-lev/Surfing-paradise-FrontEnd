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


interface VacationsCardProps {
  singleVacation: VacationModel;
}

function VacationCard({ singleVacation }: VacationsCardProps): JSX.Element {
    const { user } = useSelector((state) => state.authState);

  const reformatDate = (sqlDate: any) => {
    const date = new Date(sqlDate);
    return date.toLocaleDateString();
  };


  const handleFollowVacation = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const followCheckBoxValue = event.target.checked;
    const action = vacationFollowedAction({
      ...singleVacation,
      isFollowed: followCheckBoxValue,
    });
    store.dispatch(action);

    //TODO: update logic on backend side
    //TODO: create redux state for numbers of follow
    //TODO: update socketio binding to number of follows
    if(followCheckBoxValue){
        await axios.post<any>(Globals.vacationsUrl+ "followVacation", ({singleVacation , user}))
    }else{
        await axios.delete<VacationModel>(Globals.vacationsUrl + "followVacation/"+ singleVacation.vacationId );
    }
    }

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
        <span className="follow-count-span">Total Followers: {singleVacation.followCount}</span>
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

     
    </div>
  );
}

export default VacationCard;
