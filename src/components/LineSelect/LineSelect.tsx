import { TLink } from '@/scrapper/script';
import { LINE_KEY } from '@/utils/consts';
import { storageGet, storageSet } from '@/utils/storage';
import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

type TProps = {
    links: TLink[];
}

const LineSelect = ({links}: TProps) => {
    const { push } = useRouter();
    const [currentLine, setCurrentLine] = useState<TLink['url']>(storageGet(LINE_KEY) ?? '');
    const handleOnChangeLine = (event: SelectChangeEvent<string>) => {
        setCurrentLine(event.target.value);
        storageSet(LINE_KEY, event.target.value);
    }

    useEffect(() => {
        if(!currentLine) return;

        push(`/nka/${currentLine}`);
    }, [currentLine]);

    return (
        <FormControl sx={{width: '100%', backgroundColor: 'white'}} size='small'>
            <Select onChange={handleOnChangeLine} value={currentLine}>
                {links?.map(({ key, url, label }) => (
                    <MenuItem key={url} value={url}>{label}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default LineSelect;