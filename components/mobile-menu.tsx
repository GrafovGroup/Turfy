"use client";
import {useState} from 'react';

import {Menu, X} from 'lucide-react';
export function MobileMenu(){const[open,setOpen]=useState(false);return <div className="mobile-menu"><button className="menu-button" aria-label={open?'Close navigation':'Open navigation'} aria-expanded={open} aria-controls="mobile-nav" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>{open&&<nav id="mobile-nav" aria-label="Mobile navigation">{[['Buy turf','/products'],['Rent turf','/rentals'],['Installation','/installation'],['Locations','/locations'],['Plan your space','/plan'],['Request a quote','/quote']].map(([name,path])=><a href={path} onClick={()=>setOpen(false)} key={path}>{name}</a>)}</nav>}</div>}
