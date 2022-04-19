import Image from 'next/image';
import "@fontsource/dm-sans";
import Link from 'next/link';
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


export default function authenticate() {
    return ( 
        <>
                  {!true ? (
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                      <div style={{ 
                        fontFamily: 'DM Sans',
                        cursor: 'pointer',
                        fontStyle: 'normal',
                        fontWeight: '200',
                        color: '#FEFEFE',
                        width: '10em',
                        transform: 'rotate(0.16deg)', 
                        padding: '10px',
                        fontSize: '1.2em', textAlign: 'center', backgroundColor: '#1EC1F7', 
                        borderRadius: '48px', border: '1px solid #FEFEFE', boxSizing: 'border-box'}}
                      >
                        Authenticate
                      </div>
                      </div>
                  ) : (
                      <div style={{display: 'flex', flexDirection: 'column'}}>
                        <div style={{ 
                          fontFamily: 'DM Sans',
                          cursor: 'pointer',
                          fontStyle: 'normal',
                          fontWeight: '200',
                          color: '#1EC1F7',
                          padding: '10px',
                          width: '10em',
                          transform: 'rotate(0.16deg)', 
                          fontSize: '1.2em', textAlign: 'center', backgroundColor: '#FEFEFE', 
                          borderRadius: '48px', border: '1px solid #1EC1F7', boxSizing: 'border-box'}}
                        >
                          Authenticated!
                        </div>
                      </div>
                  )}
        </>
    );
};