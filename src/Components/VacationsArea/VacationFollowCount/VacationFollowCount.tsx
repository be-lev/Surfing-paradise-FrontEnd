import "./VacationFollowCount.css";
import { useSelector } from "react-redux";
import axios from "axios";
import VacationModel from "../Models/VacationModel";
import { Globals } from "../../../Services/Globals";



function VacationFollowCount(): JSX.Element {
    const { user } = useSelector((state) => state.authState);
    const {vacations} = useSelector(state=> state.VacationState)


const bla = vacations.filter(v=> v.isFollowed === true)
console.log(bla);

const FollowCountData = async () =>{
    const response = await axios.post<VacationModel>(Globals.vacationsUrl+ "followVacation")
}


    return (
        <div className="VacationFollowCount">
			
        </div>
    );
}

export default VacationFollowCount;
