import Head from 'next/head';
import Link from 'next/link';
import { upArrow, downArrow } from '../components/icons';

export default function Home() {
  const title = 'Unnamed Astronav (Game?)';
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content="A game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="menu">
        <h1>{title}</h1>
        <p>
          Welcome & feel free to mess around. <br />
          This project is still _very_ rough around the edges :)
        </p>

        <ul className="menu-button-list">
          <li>
            <h2>Reference Systems</h2>
          </li>
          <li>
            <Link href="/earth">
              <button className="menu-button">Earth and Moon</button>
            </Link>
          </li>
          <li>
            <Link href="/saturn">
              <button className="menu-button">Saturn and Moons</button>
            </Link>
          </li>
          <li>
            <h2>Tests</h2>
          </li>
          <li>
            <Link href="/tests/render-all-assets">
              <button className="menu-button">Test Assets</button>
            </Link>
          </li>
          <li>
            <Link href="/tests/initial-pathing">
              <button className="menu-button">Test Pathing</button>
            </Link>
          </li>
        </ul>

        {/* TODO: Generate this list based on game mode and controlMap */}
        <h2>Controls</h2>
        <ul className="menu-button-list">
          <li>
            <code>{upArrow}</code> / <code>{downArrow}</code>{' '}
            <span>Zoom in / out</span>
          </li>
          <li>
            <code>
              <span className="control">CMD / CTRL + F</span>
            </code>{' '}
            <span>Fullscreen</span>
          </li>
        </ul>
      </main>
    </div>
  );
}
