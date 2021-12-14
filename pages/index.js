import FindMultisigForm from "../components/forms/FindMultisigForm";
import Page from "../components/layout/Page";
import StackableContainer from "../components/layout/StackableContainer";

export default () => (
  <Page>
    <StackableContainer base>
      <StackableContainer lessPadding>
        <h1 className="title">DIG query</h1>
      </StackableContainer>
        <FindMultisigForm />
    </StackableContainer>
  </Page>
);
