export interface CalendarItem {
  id: string;
  calendar_dt: string;
  title: string;
  comment: string;
  youtube_music_link: string;
  calendar_thumbnail: string;
  youtube_video_id: string;
}

export interface CalendarCardItem {
  id: string;
  calendar_dt: string;
  title: string;
  comment: string;
  comment_detail: string;
  youtube_video_id: string;
  calendar_thumbnail: string;
  thumbnail_file: string | null;
}

export interface UpdateCalendarCardItem {
  title?: string;
  comment?: string;
  comment_detail?: string;
  youtube_video_id?: string;
  thumbnail_file?: File | null;
  youtube_thumbnail_link?: string;
}
