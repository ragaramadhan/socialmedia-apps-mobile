import { ApolloProvider } from "@apollo/client";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { client } from "./config/configClient";
import { LoginProvider } from "./context/LoginContext";
import { Checking } from "./stacks/stack";

export default function App() {
  // const { isLoggedIn } = useContext(LoginContext);

  return (
    <ApolloProvider client={client}>
      <LoginProvider>
        <ApplicationProvider {...eva} theme={eva.light}>
          <Checking></Checking>
        </ApplicationProvider>
      </LoginProvider>
    </ApolloProvider>
  );
}
