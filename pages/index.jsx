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
              <button className="menu-button">Earth</button>
            </Link>
          </li>
          <li>
            <Link href="/earth-and-moon">
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
            <Link href="/tests/render-planet-assets">
              <button className="menu-button">Planet Assets</button>
            </Link>
          </li>
          <li>
            <Link href="/tests/render-ship-assets">
              <button className="menu-button">Ship Assets</button>
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
            <code>
              <span className="control">UpArrow</span>
            </code>{' '}
            /{' '}
            <code>
              <span className="control">DownArrow</span>
            </code>{' '}
            Zoom in / out
          </li>
          <li>
            <code>
              <span className="control">Spacebar</span>
            </code>{' '}
            Play / Pause
          </li>
          {/* Convert these to user settings */}
          {/* <li>
            <code>
              <span className="control">CMD / CTRL</span>{' '}
              <span className="control">F</span>
            </code>{' '}
            Fullscreen (chrome only currently)
          </li>
          <li>
            <code>
              <span className="control">L</span>
            </code>{' '}
            Toggle Labels
          </li>
          <li>
            <code>
              <span className="control">P</span>
            </code>{' '}
            Toggle Path Prediction
          </li>
          <li>
            <code>
              <span className="control">SHIFT</span>{' '}
              <span className="control">+</span>
            </code>{' '}
            Increase Predicted Path Accuracy (potentially expensive)
          </li>
          <li>
            <code>
              <span className="control">SHIFT</span>{' '}
              <span className="control">-</span>
            </code>{' '}
            Decrease Predicted Path Accuracy
          </li>
          <li>
            <code>
              <span className="control">SHIFT</span>
              <span className="control">UpArrow</span>
            </code>{' '}
            Increase Predicted Path Distance
          </li>
          <li>
            <code>
              <span className="control">SHIFT</span>
              <span className="control">DownArrow</span>
            </code>{' '}
            Decrease Predicted Path Distance
          </li> */}
        </ul>
      </main>
    </div>
  );
}
