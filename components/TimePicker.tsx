'use client';
import { FC, useCallback, useState } from 'react';
export interface ITimePickerProps {
  label: string;
  onChange: (value: string, type: string) => void;
  type: string;
}
const generateOptions = (count: number, pad: boolean = true) =>
  Array.from({ length: count }, (_, i) => (pad ? String(i).padStart(2, '0') : String(i)));

const hours = generateOptions(24);
const minutes = generateOptions(60);

const TimePicker: FC<ITimePickerProps> = ({ label, onChange, type }: any) => {
  const [hour, setHour] = useState<string>('00');
  const [minute, setMinute] = useState<string>('00');
  const handleChange = useCallback(
    (field: 'hour' | 'minute', newValue: string) => {
      const updated = field === 'hour' ? `${newValue}:${minute}` : `${hour}:${newValue}`;

      if (field === 'hour') {
        setHour(newValue);
      } else if (field === 'minute') {
        setMinute(newValue);
      }
      onChange(updated, type);
    },
    [hour, minute],
  );

  return (
    <div className="flex flex-col items-start gap-1 w-full min-w-[284px] bg-[#27272A] rounded-xl px-2 h-14">
      <label className="text-xs font-medium text-slate-100" style={{ color: '#52525b' }}>
        {label}
      </label>
      <div className="flex gap-2">
        <select
          className="flex rounded p-1"
          value={hour}
          onChange={(e) => handleChange('hour', e.target.value)}
        >
          {hours.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>
        <span className="text-xl">:</span>
        <select
          className=" rounded p-1 fs"
          value={minute}
          onChange={(e) => handleChange('minute', e.target.value)}
        >
          {minutes.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TimePicker;
