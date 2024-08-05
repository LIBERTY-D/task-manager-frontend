import { createContext, FC, ReactNode, useEffect, useState } from "react";

type DashboardType = {
  children: ReactNode;
};

export type dashboardContextObjectType = {
  show: boolean;
  password: {
    error: boolean;
    message: string;
  };
  profile: {
    error: boolean;
    message: string;
  };
};

export const dashBoardContext = createContext<dashboardContextObjectType>({
  show: false,
  password: {
    error: false,
    message: "",
  },
  profile: {
    error: false,
    message: "",
  },
});

export const DashboardContext: FC<DashboardType> = ({ children }) => {
  const [dashboardToastData, SetDashboardToastData] =
    useState<dashboardContextObjectType>({
      show: false,
      password: {
        error: false,
        message: "",
      },
      profile: {
        error: false,
        message: "",
      },
    });
  //TODO: NEED TO USE REDUCERS
  useEffect(() => {}, [dashboardToastData]);

  return (
    <dashBoardContext.Provider value={dashboardToastData}>
      {children}
    </dashBoardContext.Provider>
  );
};
