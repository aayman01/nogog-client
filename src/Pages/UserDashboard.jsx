import { MdOutlineSendToMobile } from "react-icons/md";
import { IoCashOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
const services = [
  {
    title: "Send Money",
    icon: <MdOutlineSendToMobile size={40} />,
    link: "/send-money",
  },
  {
    title: "Cash Out",
    icon: <IoCashOutline size={40} />,
    link:  "/cash-out"
  },
];

const UserDashboard = () => {
  return (
    <section className="p-6 bg-white">
      <h2 className="text-xl font-semibold mb-4">Services</h2>
      <div className="grid grid-cols-2 gap-4">
        {services.map((service, index) => (
          <Link key={index} to={service.link}>
            <div
              className={`p-4 rounded-lg text-white flex flex-col items-center bg-gradient-to-b from-secondary to-primary`}
            >
              {service.icon}
              <p className="text-sm mt-2 font-semibold">{service.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default UserDashboard;
