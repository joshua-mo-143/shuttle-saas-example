import Navbar from './navbar';
import React from 'react';
import Head from 'next/head';
import { accountStore } from '@/zustandStore';

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

export default function Layout({ children }: Props) {
  let { email } = accountStore();

  return (
    <>
      <Head>
        <title>Shuttle SaaS</title>
      </Head>
      <div
        className={
          email === '' ? 'min-h-screen flex-col items-center' : 'min-h-screen w-screen flex flex-row items-top'
        }
      >
        <Navbar />
        <div
          className={email ? 'relative w-[85%] min-h-screen bg-slate-50' : 'relative w-screen min-h-screen bg-slate-50'}
        >
          {children}
        </div>
      </div>
    </>
  );
}
