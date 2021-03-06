import axios from "axios";
import React, { useEffect, useState } from "react";
import store from "../../../Redux/store";
import { Unsubscribe } from "redux";
import { vacationsDownloadedAction } from "../../../Redux/vacationsState";
import VacationModel from "../Models/VacationModel";
import "./VacationsList.css";
import VacationCard from "../VacationCard/VacationCard";
import { Globals } from "../../../Services/Globals";
import { useSelector  } from 'react-redux'


function VacationsList(): JSX.Element {

const {user} = useSelector(state => state.authState)

const {vacations} = useSelector(state=> state.VacationState)

const vacationData = async () => {
    const response = await axios.get<VacationModel[]>(
        Globals.vacationsUrl
      );
      const vacationsData = response.data;
      const action = await vacationsDownloadedAction(vacationsData);
      store.dispatch(action);
}

  useEffect( () => {
     vacationData();
  }, []);

  if (!user.isLoggedIn)return <h1>please login</h1>
  return (
    <div className="VacationsList">
      {vacations.map((v:VacationModel) => {
          return (
              <VacationCard key={v.vacationId} singleVacation={v} />
          );
      })}
    </div>
  );
}

export default VacationsList;
