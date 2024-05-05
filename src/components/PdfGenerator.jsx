import React, { useState } from 'react';


const PdfGenerator = () => {

    const formData = useState({
        name : '',

    })
    
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input 
                type="text"
                value={name} />
            </form>
        </>
        

    )
}

export default PdfGenerator