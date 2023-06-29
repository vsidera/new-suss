import MiniDrawer from "../../../../components/sidebar2/sidebar2";
import MessageTracker from "../../../../components/MessageTracker/messageTracker";

const Analytics = () => {
 

  return (
    <MiniDrawer>

      <div className="m-16">
      <h2 className='mt-4 text-xl font-semibold'>Analytics</h2>
            <p className='mb-24 text-[#094C95]'>This page will diplay Analytics</p>
            <div className='col-span-2 xs:col-span-4  shadow-[0_12px_18px_-15px_rgba(0,0,0,0.3)]  hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]  rounded-2xl border h-full'>
               {/* < MessageTracker /> */}
               </div>
      </div>
      
    </MiniDrawer>
  );
};

export default Analytics;
