import axios from "axios";
import { useEffect } from "react";
import store from "../../../Redux/store";
import { vacationsDownloadedAction } from "../../../Redux/vacationsState";
import VacationModel from "../Models/VacationModel";
import "./VacationsList.css";
import VacationCard from "../VacationCard/VacationCard";
import { Globals } from "../../../Services/Globals";
import { useSelector } from "react-redux";
import AdminVacationCard from "../../AdminArea/AdminVacationCard/AdminVacationCard";
import { NavLink } from "react-router-dom";

function VacationsList(): JSX.Element {
  //subscribe to state
  const { user } = useSelector((state) => state.authState);
  const { vacations } = useSelector((state) => state.VacationState);

  //get vacations data from server
  const vacationData = async () => {
    try {
      const response = await axios.get<VacationModel[]>(Globals.vacationsUrl);
      const vacationsData = response.data.map((vacation) => ({
        ...vacation,
        isFollowed: false,
      }));
      const action = await vacationsDownloadedAction(vacationsData);
      store.dispatch(action);
    } catch (err) {
      alert(
        "Please Login my friend it's time to join us" 
          );
          console.log(err);
    }
  };

  //unsubscribe and fetch data on demand
  useEffect(() => {
    if (vacations.length === 0) {
      vacationData();
    }
  }, []);

  return (
    <div className="VacationsList">
      {user.isAdmin && (
        <h2>
          <NavLink to={"/vacations/add-vacation/"}>Add vacation</NavLink>
        </h2>
      )}

      {vacations
        .sort(function (x: any, y: any) {
          //show Followed vacation first
          return y.isFollowed - x.isFollowed;
        })
        .map((v: VacationModel) => {
          return user.isAdmin ? ( //render different cards based on user or admin
            <AdminVacationCard key={v.vacationId} singleVacation={v} />
          ) : (
            <VacationCard key={v.vacationId} singleVacation={v} />
          );
        })}
    </div>
  );
}

export default VacationsList;
