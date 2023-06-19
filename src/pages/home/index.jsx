// import Sidebar from "../../components/sidebar/sidebar";
import MiniDrawer from "../../components/sidebar2/sidebar2";
// import "./home.scss";

const Home = () => {
  return (
    <MiniDrawer>
    <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3">
                    <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
                        <div className="text-sm font-medium text-gray-500 truncate">
                            Clients
                        </div>
                        <div className="mt-1 text-3xl font-semibold text-gray-900">
                            12,000
                        </div>
                    </div>
                    <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
                        <div className="text-sm font-medium text-gray-500 truncate">
                            Messages
                        </div>
                        <div className="mt-1 text-3xl font-semibold text-gray-900">
                            450k
                        </div>
                    </div>
                    <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
                        <div className="text-sm font-medium text-gray-500 truncate">
                            Applications
                        </div>
                        <div className="mt-1 text-3xl font-semibold text-gray-900">
                            20k
                        </div>
                    </div>
                </div>
    </MiniDrawer>
  );
};

export default Home;