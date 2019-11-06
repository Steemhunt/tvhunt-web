import React, { useContext } from "react";
import { Icon, Drawer } from "antd";
import SubmitContext from "contexts/SubmitContext";
import SubmitStep from "./SubmitStep";
import TagStep from "./TagStep";
import BudgetStep from "./BudgetStep";
import PaymentStep from "./PaymentStep";

const SubmitDrawer = props => {
  const { step, showDrawer, updateState } = useContext(SubmitContext);

  return (
    <Drawer
      className="submit-container"
      placement="right"
      closable={true}
      visible={showDrawer}
      mask={false}
      width={360}
      onClose={() => updateState({ showDrawer: false })}
      drawerStyle={{ backgroundColor: "#111724" }}
      bodyStyle={{ padding: 0 }}
    >
      {step === 0 && <SubmitStep />}
      {step === 1 && <TagStep />}
      {step === 2 && <BudgetStep />}
      {step === 3 && <PaymentStep />}
      {step > 1 && (
        <div className="submit-footer">
          <div className="prev" onClick={() => updateState({ step: step - 1 })}>
            <Icon type="left" />
            Prev
          </div>
          <div className="next" onClick={() => updateState({ step: step + 1 })}>
            Next
            <Icon type="right" />
          </div>
        </div>
      )}
    </Drawer>
  );
};

export default SubmitDrawer;
