import { TMappedLines } from '@/modules/Nka/helpers/mappers';
import { TBusStop } from '@/scrapper/script';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import React, { useEffect } from 'react';

type TProps = { currentLineBusStops: TMappedLines['busStops'][0]['hours'] }

const TimingList = ({ currentLineBusStops }: TProps) => {
    useEffect(() => {
        if(!currentLineBusStops) return;
        const firstAvailable = currentLineBusStops.find(({willAvailable}) => willAvailable);
        
        if(!firstAvailable) return;
        const element = document.getElementById(firstAvailable.id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
    } ,[currentLineBusStops])

    return (
        <List sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {currentLineBusStops?.map(({formatDeparture, timeToDeparture, timeToDepartureDesc, formatRule, id, willAvailable }) => (
                    <div key={id} id={id}>
                        <ListItem  sx={{ 
                            backgroundColor: !willAvailable ? '#eeeeee' : '',
                        }}>
                            <ListItemAvatar>
                            <Avatar sx={{ fontSize: '.8rem' }}>
                                {/* <ImageIcon /> */}
                                {/* {timeToDeparture} */}
                                {formatDeparture}
                            </Avatar>
                            </ListItemAvatar>
                            <ListItemText sx={{ color: !willAvailable ? 'silver' : ''}} primary={timeToDepartureDesc} secondary={formatRule} />
                        </ListItem>
                    </div>
            ))}
        </List>
    );
};

export default TimingList;