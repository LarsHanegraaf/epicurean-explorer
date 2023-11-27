import { parseIso, format } from 'date-fns';

export default function Date({ dateString }) {
    const date = parseIso(dateString);
    return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>
}