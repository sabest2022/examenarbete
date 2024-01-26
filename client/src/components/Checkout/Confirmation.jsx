import { useEffect } from 'react';

function Confirmation() {
    function toFirstPage() {
        window.location = "http://localhost:5173";
    }
    useEffect(() => {
        if (window.location.pathname === "/confirmation") {
            // Display a success message
            alert("Payment was successful!");
        }
    }, []);

    return (
        <div className="">
            <div className="">
                <h1 className="">Tack för ditt köp</h1>
                <button onClick={toFirstPage} className="">
                    Startsida!
                </button>
            </div>
        </div>
    );
}

export default Confirmation;
