import React from 'react';

const InformationCard = (props) => {
    const { name, course, dateOfApproval, certificateId, certificateLink } = props;
    console.log(dateOfApproval);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
      };
    const certificateOpener = () => {
        window.open(certificateLink);
    };
    
    return (
        <div
            className='w-[400px] h-[250px] flex flex-col justify-center px-4 py-5 gap-y-3 bg-white shadow-2xl border rounded-xl cursor-pointer'
            onClick={certificateOpener}
        >
            <p className='text-2xl font-bold'>Name : {name}</p>
            <p className='text-xl font-semibold'>Course : {course}</p>
            <p className='text-lg font-medium'>Date Of Approval: {formatDate(dateOfApproval)}</p>

            <p className='text-md font-normal'>Certificate Id: {certificateId}</p>
        </div>
    );
};

export default InformationCard;
