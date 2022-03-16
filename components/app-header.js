import Link from "next/link";
import { Menu, Header } from 'semantic-ui-react';
import { useSession } from "next-auth/react";
import { GrShield } from 'react-icons/gr';

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function AppHeader() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <div style={{marginTop: '75px', display: 'flex', justifyContent: 'space-around'}}>
      <Header as='h1' class="ui header" style={{textTransform: 'uppercase',
        display: 'flex', alignItems: 'center', justifyContent: 'space-around',
        fontSize: '30px'}}>
          Proof of A1C <GrShield class="ui icon" style={{marginLeft: '10px'}}/>
      </Header>
      <div class="ui header secondary menu" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
        <Link href="/">
          <a className="item">Home</a>
        </Link>
        <Link href="/">
          <a className="item">About</a>
        </Link>
        {!session ? (
            <Link href="/api/auth/signin">
              <a style={{}} className="item">Connect</a>
            </Link>
            ) : 
            (
            <Link href="/api/auth/signout">
              <a style={{}} className="item">Disconnect Dexcom</a>
            </Link>
            )
        }
        <Link href="/records">
          <a className="item">Records</a>
        </Link>
        <Link href="/records">
          <a className="item" href="mailto:proofofa1c@gmail.com">Contact Us</a>
        </Link>
      </div>
    </div>
  );
}
