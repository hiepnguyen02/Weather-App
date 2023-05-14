interface ForecastDay {
  map(arg0: (a: any) => JSX.Element): import("react").ReactNode;
  maxTemp_c: number;
  minTemp_c: number;

  date: string;
  avgTemp_c: number;

  condition_code: number;
  name: string;
  region: string;
  condition_text: string;
  icon_link: string;
}
export default ForecastDay;
