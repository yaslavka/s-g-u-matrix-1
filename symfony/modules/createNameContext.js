// TODO: Replace with React.createContext once we can assume React 16+
import createContext from "mini-create-react-context";

const createNamedContext = name => {
  const context = createContext(undefined, undefined);
  context.displayName = name;

  return context;
};

export default createNamedContext;
