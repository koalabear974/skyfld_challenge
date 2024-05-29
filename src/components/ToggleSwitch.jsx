import { ToggleSwitch as FlowbiteToggleSwitch } from "flowbite-react";

export const customThemeToggleSwitch = {
  toggle: {
    base: "after:rounded-full rounded-full border group-focus:ring-4 group-focus:ring-cyan-500/25",
    checked: {
      on: "after:bg-white after:translate-x-full",
      off: "after:bg-gray-400 dark:after:bg-gray-500 border-gray-200 bg-gray-200 dark:border-gray-600 dark:bg-gray-700",
    },
  },
};

const ToggleSwitch = (props) => {
  return (<FlowbiteToggleSwitch theme={customThemeToggleSwitch} {...props} />);
};

export default ToggleSwitch;
