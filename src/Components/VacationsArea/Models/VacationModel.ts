class VacationModel {
    public vacationId: number;
    public destination: string;
    public description: string;
    public fromDate: Date;
    public toDate: Date;
    public price: number
    public imageName: string;
    public isFollowed: boolean;
    public followCount: number;
    public image: FileList;

}

export default VacationModel