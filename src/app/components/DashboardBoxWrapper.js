import React from 'react';

const DashboardBoxWrapper = ({className, title = '', subTitle = '', children}) => {
  return (
    <div className={`${className} bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6`}>
      <div className="flex justify-between">
        <div>
          {title !== '' && (
            <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
              {title}
            </h5>
          )}
          {subTitle !== '' && (
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">
              {subTitle}
            </p>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default DashboardBoxWrapper;
