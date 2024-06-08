import { LocalizationProvider, StaticDatePicker, } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import "dayjs/locale/pt-br";
import { ptBR } from '@mui/x-date-pickers/locales';
import dayjs from "dayjs";

type props = {
  onAccept: (value: dayjs.Dayjs | null) => void
  onClose: () => void
  isOpen: boolean
  value: dayjs.Dayjs
}

function DatePicker({ onAccept, isOpen, onClose, value }: props) {
  function disableWeekends(date: dayjs.Dayjs) {
    const dayOfWeek = date.day();
    return dayOfWeek === 0 || dayOfWeek === 6;
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