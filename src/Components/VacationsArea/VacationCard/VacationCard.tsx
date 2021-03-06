import VacationModel from "../Models/VacationModel";
import "./VacationCard.css";
import { Globals } from "../../../Services/Globals";
import { useState , SyntheticEvent} from "react";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { vacationFollowedAction } from "../../../Redux/vacationsState";
import { useSelector  } from 'react-redux'
import UserModel from "../../Autharea/UserModel";
import store from "../../../Redux/store";
interface VacationsCardProps {
  singleVacation: VacationModel;
  
}

function VacationCard({ singleVacation }: VacationsCardProps): JSX.Element {
    
    const {user} = useSelector(state => state.authState)
    const {vacations} = useSelector(state=> state.VacationState)

    const reformatDate = (sqlDate: any) => {
    const date = new Date(sqlDate);
    return date.toLocaleDateString();
  };


    const  handleFollowVacation = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const followCheckBoxValue = event.target.checked;
        
        console.log("is followed?: "+ followCheckBoxValue);
        console.log('vacation id?' + singleVacation.vacationId);
        console.log("userstate" + user.uuid);
        // const action = vacationFollowedAction({...singleVacation, isFollowed: followCheckBoxValue})
        // store.dispatch(action)
      };


  return (
    <div className="VacationCard">
        <FormControlLabel
        control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" value={singleVacation.isFollowed} onChange={handleFollowVacation} />}
        label="Follow me"
      />
      <br/>
      Destination: {singleVacation.destination} 
      <br/>
      Description:
      <p> {singleVacation.description} </p>
      Starting From: <br />{" "}
      {reformatDate(singleVacation.fromDate)}
      <br />
      Until the: <br />
      {reformatDate(singleVacation.toDate)}
      <br />
      Price: {singleVacation.price}$ <br />
    
      <img src={Globals.vacationsUrl + "images/" + singleVacation.imageName} alt="WTF" />

  </div>
  );
}

export default VacationCard;
