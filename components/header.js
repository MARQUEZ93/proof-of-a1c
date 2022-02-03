import Link from "next/link";
import { Menu } from 'semantic-ui-react';
import { signIn, signOut, useSession } from "next-auth/react";

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  //TODO do something w/ loading here 

  return (
        <Menu style={{ marginTop: '10px' }}>
          <Link href="/">
            <a className="item">Proof of A1C</a>
          </Link>

          <Menu.Menu position="right">
            <Link href="/contracts/new">
              <a className="item">Deploy Contract</a>
            </Link>

            {!session ? (
            <Link href="/api/auth/signin">
              <a style={{background: '#5fb251 !important'}} className="item">Connect Dexcom</a>
            </Link>
            ) : 
            (
            <Link href="/api/auth/signout">
              <a style={{background: '#5fb251 !important'}} className="item">Disconnect Dexcom</a>
            </Link>
            )
            }
        </Menu.Menu>
      </Menu>
  );
}
