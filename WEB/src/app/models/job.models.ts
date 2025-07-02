export interface JobResponseDto {
  id: number;
  title: string;
  companyName: string;
  description: string;
  datePosted: Date;
  status: string;
  userId?: number;
}