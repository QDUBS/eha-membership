import Link from "next/link";

type Props = {
  icon: any;
  title: any;
  onclick: any;
  active: any;
  route: any;
};

const NavItem = ({ icon, title, onclick, active, route }: Props) => {
  return (
    <>
      {active === title ? (
        <Link
        href={`${route}`}
          className="w-full h-12 flex items-center px-5 py-4 mt-8 cursor-pointer"
          onClick={onclick}
        >
          <div>{icon}</div>
          <p className="text-white text-sm ml-5">{title}</p>
        </Link>
      ) : (
        <Link
        href={`${route}`}
          className="w-full h-12 flex items-center px-5 py-4 mt-8 cursor-pointer"
          onClick={onclick}
        >
          <div>{icon}</div>
            <p className="text-grey text-sm ml-5">{title}</p>
        </Link>
      )}
    </>
  );
};

export default NavItem;
