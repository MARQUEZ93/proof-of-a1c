import Link from "next/link";
import { Header, Button } from 'semantic-ui-react';
import { useSession } from "next-auth/react";
import { RiShieldCrossLine } from 'react-icons/ri';
import { IconContext } from "react-icons";

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function AppHeader() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <div class="ui clearing" style={{marginTop: '75px', display: 'flex', justifyContent: 'space-around'}}>
      <div class="ui left floated header" style={{display: 'flex', alignItems: 'center'}}>
        <div>
          <Header as='h1' style={{textTransform: 'uppercase', fontSize: '35px', margin: '0px', padding: '0px'}}>
            Proof
          </Header>
          <Header as='h1' style={{textTransform: 'uppercase', marginTop: '-15px', height: '100%', fontSize: '35px', margin: '0px', padding: '0px'}}>
            Of A1C
          </Header>
        </div>
        <IconContext.Provider value={{ color: "#00ccff", className: "global-class-name", 
          margin: '0px', padding: '0px'}}>
          <Header as='h1' style={{fontSize: "70px", margin: '0px', 
            padding: '0px', display: 'flex', alignItems: 'center'}}>
            <RiShieldCrossLine />
          </Header>
        </IconContext.Provider>
      </div>
      <div class="ui header secondary menu" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
        <Link href="/">
          <a className="item">Home</a>
        </Link>
        <Link href="/">
          <a className="item">Get Started</a>
        </Link>
        <Link href="/leaderboard">
          <a className="item">Leaderboard</a>
        </Link>
        <Link href="/records">
          <a className="item" href="mailto:proofofa1c@gmail.com">Contact Us</a>
        </Link>
      </div>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
          <Button size='large' color="black" style={{borderRadius: '25px', height: '50%'}} floated="right">Connect</Button>
        </div>
    </div>
  );
}
