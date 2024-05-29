import moment from "moment";

const TimePicker = ({dateTime, onChange, disabled = false}) => {
  return (
    <div className="flex">
      <input
        type="time"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
        value={moment(dateTime).format("HH:mm")}
        required
        disabled={disabled}
        onChange={(e) => {
          let updateDate = moment( `${moment(dateTime).format('YYYY-MM-DD')} ${e.target.value}`)
          onChange(updateDate.toString())
        }}
      />
    </div>
  );
};

export default TimePicker;
