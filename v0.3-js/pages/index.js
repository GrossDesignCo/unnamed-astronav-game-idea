import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Unnamed Astronav</title>
        <meta name="description" content="A game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Link href="/intro">Play Game</Link>
        <Link href="/assets">View Assets</Link>
      </main>
    </div>
  );
}
