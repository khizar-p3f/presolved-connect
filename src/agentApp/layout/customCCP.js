import React, { useEffect, useRef } from 'react'

const CustomCCP = () => {
    const ccp = useRef(null);
    useEffect(() => {
        initiateCCP();
    }, [])
    
    const initiateCCP = () => {
        const ccpUrl = 'https://ccp.presolved.com/ccp-v2.html';
        const container = document.getElementById('ccp-container');
        const options = {
            ccpUrl,
            loginPopup: true,
            softphone: {
                allowFramedSoftphone: true
            }
        };
      
    }


    return (
        <section style={{minHeight:'90vh'}}>

        <div>CustomCCP</div>
        </section>
    )
}

export default CustomCCP