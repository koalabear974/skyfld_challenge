import moment from "moment";

const TimePicker = ({dateTime, onChange}) => {
  return (
    <div className="flex">
      <input
        type="time"
        className="rounded-lg bg-gray-50 border text-gray-900 leading-none focus:ring-blue-500 focus:border-blue-500 block flex-1 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={moment(dateTime).format("HH:mm")}
        required
        onChange={(e) => {
          let updateDate = moment( `${moment(dateTime).format('YYYY-MM-DD')} ${e.target.value}`)
          onChange(updateDate.toString())
        }}
      />
    </div>
  );
};

export default TimePicker;
