import Layout from '../components/Layout';
import React from 'react';
import { useRouter } from 'next/router';
import { accountStore } from '../zustandStore';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  const [loginEmail, setLoginEmail] = React.useState<string>('');
  const [pw, setPw] = React.useState<string>('');
  const [pwVis, setPwVis] = React.useState<boolean>(false);

  const { email, changeEmail } = accountStore();

  let router = useRouter();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const url = `//${window.location.host}/api/auth/login`;

    try {
      let res = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginEmail,
          password: pw,
        }),
      });

      if (res.ok) {
        changeEmail(loginEmail);
        router.push('/dashboard');
      } else {
        console.log('Incorrect login details.');
      }
    } catch (e: any) {
      console.log(`Error: ${e}`);
    }
  };

  const togglePassword = (e: React.SyntheticEvent) => {
    e.preventDefault();

    setPwVis(!pwVis);
  };

  return (
    <>
      <Layout>
        <form className="min-h-screen flex flex-col items-center justify-center bg-gray-100" onSubmit={handleSubmit}>
          <div
            className="
          flex flex-col
          bg-white
          shadow-md
          px-4
          sm:px-6
          md:px-8
          lg:px-10
          py-8
          rounded-3xl
          w-50
          max-w-md"
          >
            <h1 className="lg:text-2xl text-xl text-center">Welcome Back</h1>
            <fieldset className="mt-10">
              <label htmlFor="email" className="text-xs tracking-wide text-gray-600">
                E-Mail Address:
              </label>
              <div className="relative mb-4">
                <FontAwesomeIcon
                  className="inline-flex
                    items-center
                    justify-center
                    absolute
                    left-3
                    top-[30%]
                    h-full"
                  icon={faAt}
                  color="rgb(59 130 246)"
                />
                <input
                  type="email"
                  name="email"
                  className="text-sm
                    placeholder-gray-500
                    pl-10
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400"
                  value={loginEmail}
                  onInput={(e) => setLoginEmail((e.target as HTMLInputElement).value)}
                  placeholder="Enter your email"
                />
              </div>
              <label htmlFor="password" className="text-xs tracking-wide text-gray-600">
                Password:
              </label>

              <div className="relative mb-4">
                <FontAwesomeIcon
                  className="inline-flex
                    items-center
                    justify-center
                    absolute
                    left-3
                    top-[30%]
                    h-full"
                  icon={faLock}
                  color="rgb(59 130 246)"
                />

                <input
                  type={pwVis ? 'text' : 'password'}
                  name="password"
                  className="text-sm
                    placeholder-gray-500
                    pl-10
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400"
                  value={pw}
                  onInput={(e) => setPw((e.target as HTMLInputElement).value)}
                  placeholder="Enter your password"
                />
                <FontAwesomeIcon
                  className="inline-flex
                    items-center
                    justify-center
                    absolute
                    right-3
                    top-[30%]
                    h-full"
                  icon={pwVis ? faEyeSlash : faEye}
                  onClick={togglePassword}
                  color="rgb(59 130 246)"
                />
              </div>

              <div className="flex w-full">
                <button
                  type="submit"
                  className="
                  flex
                  mt-2
                  items-center
                  justify-center
                  focus:outline-none
                  text-white text-sm
                  sm:text-base
                  bg-blue-500
                  hover:bg-blue-600
                  rounded-2xl
                  py-2
                  w-full
                  transition
                  duration-150
                  ease-in
                "
                >
                  <span className="mr-2 uppercase">Sign In</span>
                  <span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </button>
              </div>
            </fieldset>
          </div>
          <div className="flex justify-center items-center mt-6">
            <span
              className=" inline-flex
            items-center
            text-gray-700
            font-medium
            text-xs text-center"
            >
              Don&apos;t have an account?
              <Link href="/register" className="text-xs ml-2 text-blue-500 font-semibold">
                Register now
              </Link>
            </span>
          </div>
        </form>
      </Layout>
    </>
  );
}
