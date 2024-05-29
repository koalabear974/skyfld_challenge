import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";

const ErrorAlert = ({message}) => {
  return (
    <Alert color="failure" icon={HiInformationCircle}>
      <span className="font-medium">Error: </span> {message}
    </Alert>
  );
};

export default ErrorAlert;
