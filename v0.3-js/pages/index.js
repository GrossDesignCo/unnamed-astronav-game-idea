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

      <main class="menu">
        <h1>Unnamed Astronav Playground</h1>

        <p>
          Welcome & feel free to mess around. <br />
          This project is still pretty rough around the edges :)
        </p>

        <ul>
          <li>
            <Link href="/earth">Earth and Moon</Link>
          </li>
          <li>
            <Link href="/saturn">Saturn and Moons</Link>
          </li>
          <li>
            <Link href="/tests/render-all-assets">Test Assets</Link>
          </li>
          <li>
            <Link href="/tests/initial-pathing">Test Pathing</Link>
          </li>
        </ul>
      </main>
    </div>
  );
}
