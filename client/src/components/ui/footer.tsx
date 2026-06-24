export default function Footer() {
    return (
        <footer
            className="text-center text-sm leading-loose text-[var(--text-color)]/50 pt-2 border-t-[.5px] border-[var(--border-color)]/50"
            style={{
                fontFamily: 'var(--Instrument-Serif)',
                fontStyle: 'italic'
            }}
        >
            &copy;
            <span
                style={{
                    fontFamily: 'var(--Instrument-Serif)',
                    fontStyle: 'regular'
                }}
            >
               &nbsp; James Balito  &nbsp; 
            </span>
            {new Date().getFullYear()} All rights reserved.
        </footer>
    )
}