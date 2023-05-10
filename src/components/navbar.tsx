import React from 'react';
import Link from 'next/link';
import { accountStore } from '@/zustandStore';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faChevronUp,
  faCoins,
  faGauge,
  faGaugeSimple,
  faHandshake,
  faRightFromBracket,
  faRocket,
  faUserCircle,
  faUserSecret,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import Navigation from './Navigation';

export default function Navbar() {
  const { email, changeEmail } = accountStore();
  const [logoutVis, setLogoutVis] = React.useState<boolean>(false);
  const router = useRouter();

  const handleLogout = async () => {
    const url = `//${window.location.host}/api/auth/logout`;

    const res = await fetch(url);

    if (res.ok) {
      changeEmail('');
      router.push('/');
    }
  };

  if (email === '') return <Navigation />;

  return (
    <aside className="flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
      <Link href="/">
        <FontAwesomeIcon icon={faRocket} size="3x" color="rgb(59 130 246)" />
      </Link>
      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav className="-mx-3 space-y-6 flex flex-col justify-between h-full">
          <div className="space-y-3">
            <Link
              className="flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
              href="/dashboard"
            >
              <FontAwesomeIcon icon={faGauge} color="rgb(59 130 246)" />

              <span className="mx-2 text-sm font-medium">Dashboard</span>
            </Link>

            <Link
              className="flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
              href="/dashboard/customers"
            >
              <FontAwesomeIcon icon={faUsers} color="rgb(59 130 246)" />

              <span className="mx-2 text-sm font-medium">Customers</span>
            </Link>
            <Link
              className="flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
              href="/dashboard/customers"
            >
              <FontAwesomeIcon icon={faHandshake} color="rgb(59 130 246)" />

              <span className="mx-2 text-sm font-medium">Deals</span>
            </Link>
            <Link
              className="flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
              href="/dashboard/upgrade"
            >
              <FontAwesomeIcon icon={faCoins} color="rgb(59 130 246)" />

              <span className="mx-2 text-sm font-medium">Upgrade</span>
            </Link>
          </div>

          <div className="space-y-3 flex flex-col dark:text-gray-200 items-start">
            <div className="px-3">
              <FontAwesomeIcon icon={faUserSecret} color="rgb(59 130 246)" />
              <span className="text-sm mx-2 font-medium">{email}</span>
            </div>
            <div className="px-3">
              <FontAwesomeIcon icon={faRightFromBracket} color="rgb(59 130 246)" />
              <button className="text-sm mx-2 font-medium" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
}
