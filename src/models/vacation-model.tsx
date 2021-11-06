export class VacationModel {
  public constructor(
    public vacationId?: number,
    public description?: string,
    public destination?: string,
    public image?: string,
    public start_date?: string | Date,
    public end_date?: string | Date,
    public price?: number,
    public follow?: boolean
  ) {}
}
