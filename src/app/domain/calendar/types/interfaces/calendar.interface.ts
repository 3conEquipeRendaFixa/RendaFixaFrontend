export interface CalendarItem {
  exchange: string;
  location: string;
  segment: string;
  process: string;
  description: string;
  order: string;
  saturdayWorkDay: string;
  sundayWorkDay: string;
  startDate: string;
  endDate?: string;
  creation: string;
  lastUpdate: string;
  status: number;
}

export interface CalendarHoliday {
  data: string;
  descricao: string;
}
