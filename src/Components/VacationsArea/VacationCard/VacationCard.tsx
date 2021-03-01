import VacationModel from "../Models/VacationModel";
import "./VacationCard.css";
import { Globals } from "../../../Services/Globals";

interface VacationsCardProps {
  singleVacation: VacationModel;
}

function VacationCard({ singleVacation }: VacationsCardProps): JSX.Element {
  
    const reformatDate = (sqlDate: any) => {
    const date = new Date(sqlDate);
    return date.toLocaleDateString();
  };

  return (
    <div className="VacationCard">
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
