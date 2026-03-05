export interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

export interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
}
