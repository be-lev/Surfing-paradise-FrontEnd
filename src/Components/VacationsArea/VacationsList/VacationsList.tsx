import axios from "axios";
import React, { useEffect, useState } from "react";
import store from "../../../Redux/store";

import { vacationsDownloadedAction } from "../../../Redux/vacationsState";
import VacationModel from "../Models/VacationModel";
import "./VacationsList.css";
import VacationCard from "../VacationCard/VacationCard";
import { Globals } from "../../../Services/Globals";

function VacationsList(): JSX.Element {
  const [vacations, setVacations] = useState<VacationModel[]>([]);
if(store.getState().authState.user){
    console.log("user logged in");
}else{
    console.log('no user in the system');
}

  useEffect(() => {
    (async () => {
      const response = await axios.get<VacationModel[]>(
        Globals.vacationsUrl
      );
      const vacations = response.data;

      setVacations(vacations);
      const action = vacationsDownloadedAction(vacations);
      store.dispatch(action);
    })();
  }, []);

 
  return (
    <div className="VacationsList">
    
      {/* {vacations.length === 0 && <img className="Loading" src={loading} alt="YES"/>} */}
      {vacations.map((v:VacationModel) => {
          return (
              <VacationCard key={v.vacationId} singleVacation={v} />
          );
      })}
    </div>
  );
}

export default VacationsList;
