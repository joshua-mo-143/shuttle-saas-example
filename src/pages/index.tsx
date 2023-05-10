import Layout from '../components/Layout';
import React from 'react';

const cards = [
  {
    title: 'Deployed from Shuttle',
    description: 'Deployed via Shuttle, a Rust-native cloud dev platform.',
    href: 'https://www.shuttle.rs',
  },
  {
    title: 'Learn About Rust',
    description: 'Rust is a brilliant language for writing memory-safe, efficient software.',
    href: 'https://doc.rust-lang.org/book/',
  },
  {
    title: 'Learn About Next.js',
    description: 'Next.js is a React-based meta-framework at the forefront of JavaScript.',
    href: 'https://nextjs.org/',
  },
  {
    title: 'Join the community',
    description: 'Join a thriving community with like-minded Rustaceans and web developers.',
    href: 'https://discord.com/invite/shuttle',
  },
];

export default function Home() {
  return (
    <>
      <Layout>
        <section className="min-h-full py-40 w-full flex flex-col justify-center items-center gap-10">
          <h1 className="text-3xl font-bold">Next.js + Rust SaaS Template</h1>

          <div className="lg:w-1/2 grid grid-cols-2 justify-center items-center gap-10 ">
            {cards.map((card) => (
              <div
                key={card.title}
                className="shadow-md px-10 py-5 rounded-lg bg-slate-50 text-center border h-full flex flex-col justify-between"
              >
                <h2 className="font-bold text-center text-xl">{card.title}</h2>
                <p>{card.description}</p>
                <a href={card.href} target="_blank" className="text-blue-300 visited:text-blue-600 transition-all">
                  Learn more here
                </a>
              </div>
            ))}
          </div>
        </section>
      </Layout>
    </>
  );
}
