import "./VacationFollowCount.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Globals } from "../../../Services/Globals";
import { vacationFollowedAction } from "../../../Redux/vacationsState";
import store from "../../../Redux/store";


function VacationFollowCount(): JSX.Element {
    const {vacations} = useSelector(state=> state.VacationState)
    const vacationIdFromVacations = vacations.map(v=> v.vacationId)

const followCountData = async () =>{
    for(let i =0; i<vacationIdFromVacations.length; i++){
        const response = await axios.get<number>(Globals.vacationsUrl+ "vacationFollowersCount/" + vacationIdFromVacations[i])
        const followedCounterData= response.data
        console.log('followedCounterData: ' +(vacations.filter(v=> v.vacationId === vacationIdFromVacations[i])));
        const action = vacationFollowedAction({
            ...vacations.filter(v=> v.vacationId === vacationIdFromVacations[i]),
            followCount: followedCounterData[0].count
          });
        store.dispatch(action)
        
    
    }
}  
    useEffect( () => {
        followCountData();
      
    }, []);

    return (
        <div className="VacationFollowCount">
			
        </div>
    );
}

export default VacationFollowCount;
