export interface ApplicationResponseDto {
  id: number;
  userId: number;
  userName: string;
  jobPostingId: number;
  jobTitle: string;
  applicationDate: Date;
  status: string;
  coverLetter: string;
}