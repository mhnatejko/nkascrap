import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useEffect, useState } from 'react';
import { TLink, getNkaPage } from '@/scrapper/script';
import { FormControl, Link, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { storageGet } from '@/utils/storage';
import { LINE_KEY } from '@/utils/consts';
import dynamic from 'next/dynamic';

const DynamicLineSelect = dynamic(() => import('@/components/LineSelect/LineSelect'), {
    ssr: false
});

const Nka = ({ links }: {links: TLink[]}) => {

    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
            
            {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                NKAScrapped
            </Typography> */}
           <DynamicLineSelect {...{links }}/>
            </Toolbar>
        </AppBar>
        
        </Box>
    );
};

export default Nka;