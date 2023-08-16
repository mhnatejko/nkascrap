import { NKA_BASE_URL } from '@/utils/consts';
import axios from 'axios';
import cheerio from 'cheerio';
import { writeFile } from 'fs';



export type THours = {
    departure: string,
    type: string, 
    rule: string
}
export type TBusStop = {
    name: string,
    hours: THours[]
}
export type TLine = {
    line: string,
    busStops: TBusStop[]
}
 

const normalizeString = (string: string) => 
    string
        .replace(/-/g,  '')
        .replace(/ /g,  '')
        .replace(/ę/g, "e")
        .replace(/ó/g, "o")
        .replace(/ą/g, "a")
        .replace(/ś/g, "s")
        .replace(/ł/g, "l")
        .replace(/ż/g, "z")
        .replace(/ź/g, "z")
        .replace(/ć/g, "c")
        .replace(/ń/g, "n")
        .replace(/(?:^|\s)\S/g, a => a.toLowerCase());

export type TLink = {key: string, url: string, label: string};

export const getNkaPage = async () => {
    const {data} = await axios.get(NKA_BASE_URL());
    if(!data) return [];
    const $ = cheerio.load(data);

    const links: TLink[] = [];
    $('#categories a').each((_i, el) => {
        const link = $(el).attr('href');
        const label = $(el).text();

        if(!label.includes('-')) return;
        
        links.push({
            key: normalizeString(label),
            url: `${link?.replace('.php', '')}`, 
            label
        });
    });

    return links;
}

export const getTableData = async (endpoint: TLink['url']) => {
    const {data} = await axios.get(endpoint);
    if(!data) return;

    const $ = cheerio.load(data);

    const lines: TLine[] = [];
    
    $('table').each((_i, el) => {
        const table = $(el);
        const rows = table.find('tr');
        const typeHeaders: string[] = [];
        const ruleHeaders: string[] = [];
        const busStops: TBusStop[] = [];

        rows.each((iRow, el) => {
            const row = $(el);
            const cells = row.find('td');
            const html = row.html()?.trim()?.toLowerCase() || '';
            
            if(!html.length) return;
            if(html.includes('<td>kz</td>')) return cells.each((_iCell, el) => typeHeaders.push($(el).text().trim()));
            if(html.includes('przystanki')) return cells.each((_iCell, el) => ruleHeaders.push($(el).text().trim()));

            const busStop: TBusStop = {
                name: '',
                hours: [],
            }

            cells.each((iCell, el) => {
                const cellData = $(el).text().trim();
             
                if(iCell === 0) return busStop.name = cellData;

                return busStop.hours.push({
                    departure: cellData,
                    type: typeHeaders[iCell], 
                    rule: ruleHeaders[iCell]
                });
            });
            busStops.push(busStop);
        });

        lines.push({
            line: 'test line name',
            busStops
        });
    });

    return lines;
}

// getTableData('kruszwica_torun.php');