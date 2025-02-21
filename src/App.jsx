import Header from "./components/Header";
import Loading from "./components/Loading";
import RouterConfig from "./config/RouterConfig";
import PageContainer from "./container/PageContainer";

function App() {
  return (
    <>
      <PageContainer>
        <Header />
        <RouterConfig />
        <Loading />
      </PageContainer>
    </>
  );
}

export default App;
