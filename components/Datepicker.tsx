'use client';
import type { DateValue } from '@internationalized/date';

import { DatePicker } from '@heroui/date-picker';
import { useCallback, useState } from 'react';
import { Button } from '@heroui/button';

import TimePicker from './TimePicker';

const DateTimePicker = () => {
  const [startDate, setStartDate] = useState<DateValue | null | undefined>();
  const [endDate, setEndDate] = useState<DateValue | null | undefined>();
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [selectedStartDate, setSelectedStartDate] = useState<string>();
  const [selectedEndDate, setSelectedEndDate] = useState<string>();
  const [error, setError] = useState<boolean>(false);

  const handleGetDate = useCallback((e: any, type: string) => {
    switch (type) {
      case 'startdate':
        const startdate = `${e.month}/${e.day}/${e.year}`;

        setSelectedStartDate(startdate);
        setStartDate(e);
        break;
      case 'enddate':
        const enddate = `${e.month}/${e.day}/${e.year}`;

        setSelectedEndDate(enddate);
        setEndDate(e);
        break;
      case 'starttime':
        setStartTime(e);
        break;
      case 'endtime':
        setEndTime(e);
        break;
    }
  }, []);

  const selectedTimeSlots = () => {
    if (!startDate || !endDate || !startTime || !endTime) {
      setError(true);

      return;
    }
    setError(false);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center gap-8">
      <div className="flex flex-col justify-center items-center lg:flex-row flex-wrap gap-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <DatePicker
            className="w-full min-w-[284px]"
            label="Start date"
            maxValue={endDate || null}
            onChange={(e) => handleGetDate(e, 'startdate')}
          />
          <DatePicker
            className="w-full min-w-[284px]"
            label="End date"
            minValue={startDate || null}
            onChange={(e) => handleGetDate(e, 'enddate')}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <TimePicker label="Start time" type="starttime" onChange={handleGetDate} />
          <TimePicker label="End time" type="endtime" onChange={handleGetDate} />
        </div>
      </div>
      {error && <p className="text-red-600">Select all fields</p>}
      <Button className="max-w-36" color="primary" onPress={selectedTimeSlots}>
        Apply slots
      </Button>
      {!error && (
        <p>
          {selectedStartDate} — {selectedEndDate} | {startTime} — {endTime}
        </p>
      )}
    </div>
  );
};

export default DateTimePicker;
