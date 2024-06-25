import { LocalizationProvider, StaticDatePicker, } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import "dayjs/locale/pt-br";
import dayjs from "dayjs";

type props = {
  onAccept: (value: dayjs.Dayjs | null) => void
  onClose: () => void
  isOpen: boolean
  value: dayjs.Dayjs
  unavailableDates: string[]
}

function DatePicker({ onAccept, isOpen, onClose, value, unavailableDates }: props) {

  function disableWeekends(date: dayjs.Dayjs) {
    const dayOfWeek = date.day();
    const dateString = date.format('YYYY-MM-DD');

    return dayOfWeek === 0 || dayOfWeek === 6 || dayOfWeek === 2 || dayOfWeek === 4 || unavailableDates.some((disabledDate) => disabledDate.startsWith(dateString))
  }

  return (
    <>
      {
        isOpen &&
        <div className="w-full h-screen bg-[rgb(0,0,0,0.6)] flex items-center justify-center z-50 fixed">
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
            <StaticDatePicker
              disablePast
              shouldDisableDate={disableWeekends}
              value={value}
              onAccept={onAccept}
              onClose={onClose}
              sx={{
                borderRadius: 5,
                '.MuiDateCalendar-root': {
                  color: '#53735B',
                },
                '.MuiPickersToolbar-root': {
                  color: '#53735B',
                },
              }} />
          </LocalizationProvider>
        </div>
      }
    </>
  );
}

export default DatePicker;