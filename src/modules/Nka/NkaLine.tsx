import { TLine } from '@/scrapper/script';
import { type } from 'os';
import React, { createRef, useEffect, useState } from 'react';
import { linesMapper } from './helpers/mappers';
import { Avatar, Box, Card, CardContent, FormControl, InputLabel, List, ListItem, ListItemAvatar, ListItemText, MenuItem, Select, Tab, Tabs, Typography } from '@mui/material';
import TimingList from '@/components/TimingList/TimingList';
import '../../app/globals.css'

type TProps = {
    // lines: TLine[];
    lines: string;
}

const NkaLine = ({ lines }: TProps) => {
    console.log(linesMapper(JSON.parse(lines)));

    const [ linesParsed, setLinesParsed ] = useState(() => linesMapper(JSON.parse(lines)));
    const [tabValue, setTabValue] = useState(0);
    const [busStop, setBusStop] = useState('');

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
      setTabValue(newValue);
    };


    const headerRef = createRef<HTMLDivElement>();
    const [top, setTop] = useState(0);
    useEffect(() => {
        if(!headerRef?.current) return;
        const top = headerRef.current.clientHeight;
        setTop(top);
    }
    , [headerRef?.current?.clientHeight]);



    return (
        <div>
            <Box ref={headerRef} sx={{ borderBottom: 1, borderColor: 'divider', position: 'sticky', top: '0', zIndex: 2, background: 'white' }}>
                <Tabs value={tabValue} onChange={handleChangeTab} aria-label="basic tabs example">
                    {linesParsed.map(({ line }) => (
                        <Tab key={line} label={line} />
                    ))}
                </Tabs>
            </Box>
            {linesParsed.map(({ line, busStops }, index) => (
                <div
                    key={line}
                    role="tabpanel"
                    hidden={tabValue !== index}
                    id={`simple-tabpanel-${index}`}
                    aria-labelledby={`simple-tab-${index}`}
                >
                    {tabValue === index && (
                        <Box sx={{ p: 3, position: 'sticky', top: `${top}px`, zIndex: 2, backgroundColor: 'white'  }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Przystanek</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    value={busStop}
                                    label="Age"
                                    onChange={e => setBusStop(e.target.value)}
                                >
                                    {busStops.map(({ name }) => (
                                        <MenuItem key={name} value={name}>{name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    )}
                    {busStop && (
                        <TimingList currentLineBusStops={busStops.find(({ name }) => name === busStop)?.hours as any}/>
                    )}
                </div>
            ))}
        </div>
    );
};

export default NkaLine;