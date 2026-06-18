import { useState, useEffect } from "react"
import "./Footer.css"

function Footer() {
    const messages = [
        'Copyright pending. Wallet loading...',
        'All rights reserved. The funds to enforce them are still in development.',
        'Intellectual property protected by vibes alone.',
        'All rights reserved. The wrongs are still available.',
        'Unauthorized copying is discouraged, mostly because I will be sad.',
        'Protected by copyright and wishful thinking.'
    ]
    
        const [message, setMessage] = useState(messages[0]);

    useEffect(() => {
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * messages.length);
            setMessage(messages[randomIndex]);
        }, 3000); 

        return () => clearInterval(interval);
    }, []);

    return (
        <>
        <footer className='footnote'>
            <p>{message}</p>
        </footer>
        </>
    )
}

export default Footer