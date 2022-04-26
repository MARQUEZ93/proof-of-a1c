import Image from 'next/image';
import "@fontsource/dm-sans";
import Link from 'next/link';
import { signIn, signOut } from "next-auth/react"
import { useEffect, useState, useReducer, useCallback } from "react";
import { useSession } from 'next-auth/react';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  List,
  Menu,
  Segment,
  Sidebar,
  Visibility,
  BreadcrumbDivider,
} from 'semantic-ui-react';


    export default function Authenticated({isMobile = false}) {
        const { data: session, status } = useSession();
        const loading = status === 'loading';
        let url;
        if (typeof window !== 'undefined') {
            url = window.location.href + "#get-started";
        } else {
            url = process.env.NEXTAUTH_URL + "#get-started";
        }
        // If no session exists, display access denied message
        if (typeof window !== 'undefined' && loading) return null;
        if (!session) { return  (
            <div onClick={() => signIn('dexcom', {callbackUrl: url})} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                      <div style={{ 
                        fontFamily: 'DM Sans',
                        cursor: 'pointer',
                        fontStyle: 'normal',
                        fontWeight: '200',
                        color: '#FEFEFE',
                        width: '12em',
                        transform: 'rotate(0.16deg)', 
                        padding: '10px',
                        fontSize: '1.2em', textAlign: 'center', backgroundColor: '#1EC1F7', 
                        borderRadius: '48px', border: '1px solid #FEFEFE', boxSizing: 'border-box'}}
                      >
                        Authenticate
                      </div>
                      </div>
        )};
    return ( <div onClick={() => signOut('dexcom', {callbackUrl: `${process.env.NEXTAUTH_URL}#get-started`})} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <div style={{ 
                          fontFamily: 'DM Sans',
                          cursor: 'pointer',
                          fontStyle: 'normal',
                          fontWeight: '200',
                          color: '#1EC1F7',
                          padding: '10px',
                          width: '12em',
                          transform: 'rotate(0.16deg)', 
                          fontSize: '1.2em', textAlign: 'center', backgroundColor: '#FEFEFE', 
                          borderRadius: '48px', border: '1px solid #1EC1F7', boxSizing: 'border-box'}}
                        >
                          Logout from Dexcom
                        </div>
                      </div>
                  )
};