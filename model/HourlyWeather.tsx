interface HourlyWeather {
  slice(arg0: number, arg1: number): string;
  map(arg0: (a: any) => JSX.Element | null): import("react").ReactNode;
  time: string;
  temp_c: number;
  condition_code: number;
  is_day: number;
  icon_link: string;
}
export default HourlyWeather;
