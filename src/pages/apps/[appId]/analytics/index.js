import MiniDrawer from "../../../../components/sidebar2/sidebar2";
import MessageTracker from "../../../../components/MessageTracker/messageTracker";
import SuccessSummary from "../../../../components/deliveredChart/chart";
import UnitsSpent from "../../../../components/deliveredChart/unitsSpent";
import DatePickerValue from "../../../../components/utils/datePicker";

const Analytics = () => {
 

  return (
    <MiniDrawer>

<div className="m-16">
  <h2 className="mt-4 text-xl font-semibold">Analytics</h2>
  <div className="flex justify-end">
  <div>
    <DatePickerValue />
  </div>
</div>
  <p className="mb-24 text-[#094C95]">Analytics for the organisation</p>
  <div className="flex justify-between">
    <div className="flex flex-col items-center shadow-[0_12px_18px_-15px_rgba(0,0,0,0.3)] hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] rounded-2xl border h-1/3 w-1/3">
      <p className="text-xl text-primary flex justify-center m-4">Delivery Success Meter</p>
      <SuccessSummary />
    </div>
    <div className="flex flex-col items-center shadow-[0_12px_18px_-15px_rgba(0,0,0,0.3)] hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] rounded-2xl border h-1/3 w-2/3 mx-4">
      <p className="text-xl text-primary flex justify-center m-4">Units Expenditure Meter</p>
      <UnitsSpent />
    </div>
  </div>
</div>

      
    </MiniDrawer>
  );
};

export default Analytics;
