export class Appointment {
  constructor(
    public id: string,
    public date: Date,
    public status: 'SCHEDULED' | 'CANCELLED' | 'COMPLETED',
    public userId: string,
    public serviceId: string,
    public createdAt: Date
  ) {}

  public cancel() {
    this.status = 'CANCELLED';
  }

  public complete() {
    this.status = 'COMPLETED';
  }
}
