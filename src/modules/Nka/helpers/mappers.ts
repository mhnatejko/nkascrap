import { TBusStop, TLine } from "@/scrapper/script";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import pl from "dayjs/locale/pl"
dayjs.locale(pl);
dayjs.extend(relativeTime);

const rules = {
    b: {
        description: "nie kursuje w dniu 1.I, w pierwszy dzień Świąt Wielkanocnych i w dniu 25.XII",
        test: '',
    },
    S: {
        description: "Kursuje w dni nauki szkolnej",
        test: '',
    },
    E: {
        description: "kursuje od poniedziałku do soboty oprócz świąt",
        test: '',
    },
    D: {
        description: "kursuje od poniedziałku do piątku oprócz świąt",
        test: '',
    },
    C: {
        description: "kursuje w soboty, niedziele i święta",
        test: '',
    },
    KZ: {
        description: "komunikacja zwykła",
        test: '',
    },
}

const getLineName = (busStops: TBusStop[]) => {
    const firstStopName = busStops[0].name.split(' ')[0];
    const lastStopName = busStops[busStops.length - 1].name.split(' ')[0];

    return `${firstStopName} - ${lastStopName}`;
}


export type TMappedLines = {
    line: string;
    busStops: {
        name: string;
        hours: {
            id: string;
            departure: string;
            formatDeparture: string;
            timeToDeparture: number;
            timeToDepartureDesc: string;
            willAvailable: boolean;
            type: string;
            rule: string;
            formatRule: string;
        }[]
    }[]
}
export const linesMapper = (lines: TLine[]) => lines.map(({line, busStops}) => ({
    line: getLineName(busStops),
    busStops: busStops.map(({name, hours}) => ({
        name,
        hours: hours.map(({departure, type, rule}, hourIndex) => {
            const [h, m] = departure.split(':')
            const date = dayjs().hour(+h).minute(+m);

            if(!dayjs(date).isValid()) return;

            // console.log(date)
            const timeToDeparture = (dayjs(date).diff(dayjs(), 'minute'))
            return {
                id: ''+hourIndex,
                departure,
                formatDeparture: date.format('HH:mm'),
                timeToDeparture,
                timeToDepartureDesc: dayjs().to(date),
                willAvailable: +timeToDeparture >= 0,
                // timeToDeparture: dayjs(date).toNow(true),
                // timeToDeparture: dayjs().from(dayjs('1990-01-01')),
                type,
                rule,
                formatRule: rules[rule as keyof typeof rules]?.description,
            }
        }).filter(Boolean)
    }))
}))