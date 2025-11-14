import TrendMeter from '../TrendMeter';

export default function TrendMeterExample() {
  return (
    <div className="space-y-4 p-4 max-w-md">
      <TrendMeter intensity={95} label="Critical" />
      <TrendMeter intensity={70} label="High" />
      <TrendMeter intensity={45} label="Medium" />
      <TrendMeter intensity={25} label="Low" />
    </div>
  );
}
