import { createContext, FC, ReactNode, useContext, useMemo } from "react";
import { StoredValueType, useLocalStorage } from "../../utils/useLocalStorage";
import { useNavigate } from "react-router";

type AuthType = {
  children: ReactNode;
};
export type ContextType = {
  user: StoredValueType | null;
  login: (data: StoredValueType | null) => void;
  logout: () => void;
  updateUser: (data: StoredValueType | null) => void;
};

const AuthContext = createContext<ContextType>({
  user: null,
  logout: () => {},
  login: (_) => {},
  updateUser: () => {},
});

export const Auth: FC<AuthType> = ({ children }) => {
  const [user, setUser] = useLocalStorage({
    keyName: "task-manager-user",
    defaultValue: null,
  });

  const navigate = useNavigate();
  const login = (data: StoredValueType | null) => {
    setUser(data);
    setTimeout(() => {
      navigate("/", { replace: true });
    }, 3000);
  };

  const logout = () => {
    navigate("/login", { replace: true });
    setUser(null);
  };
  const updateUser = (data: StoredValueType | null) => {
    setUser(data);
  };

  const value = useMemo(() => ({ user, login, logout, updateUser }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
